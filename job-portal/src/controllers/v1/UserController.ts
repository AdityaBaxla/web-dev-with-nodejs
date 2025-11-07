import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import * as fs from "fs/promises";
import path from "path";

// ENUMS
import { UserRole } from "../../utils/Enums";

// MAILER
import { MailTransporter } from "../../config/MailTransporter";

// REST ERRORS & RESPONSE
import ErrorHandler from "../../errors/ErrorHandler";
import httpStatusCodes from "../../errors/HttpCodes";
import ResponseGenerator from "../../utils/ResponseGenerator";

// ENTITIES
import { User } from "../../entity/User.entity";

// REPOSITORIES
import { userRepository } from "../../utils/Repositories";
import { AuthHelper } from "../../utils/AuthHelper";

// CONSTANTS
const transporter = MailTransporter.getInstance();

export class UserController {
    public static async userSignUp(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { name, email, password, role } = req.body;

            if (!name || !email || !password || !role)
                throw new ErrorHandler(
                    httpStatusCodes.BAD_REQUEST,
                    "All fields are required"
                );

            if (!Object.values(UserRole).includes(role))
                throw new ErrorHandler(
                    httpStatusCodes.BAD_REQUEST,
                    "Invalid role"
                );

            // check if user with email already exists
            const user: User = await userRepository.findOne({
                where: { email },
            });
            if (user)
                throw new ErrorHandler(
                    httpStatusCodes.BAD_REQUEST,
                    "User with this email already exists"
                );

            const hashedPassword: string = await bcrypt.hash(password, 10);
            let newUser: User;

            if (role === UserRole.RECRUITER) {
                const { company_name, sector, company_description } = req.body;

                if (!company_name || !sector || !company_description)
                    throw new ErrorHandler(
                        httpStatusCodes.BAD_REQUEST,
                        "All fields are required"
                    );

                // inserts the user into the database
                newUser = await userRepository.save({
                    name,
                    email,
                    password: hashedPassword,
                    role,
                    recruiterDetails: {
                        company_name,
                        sector,
                        company_description,
                    },
                });
            } else {
                const {
                    current_sector,
                    experience,
                    qualification,
                    brief_intro,
                    resume_url,
                    linkedin_url,
                    github_url,
                    portfolio_url,
                } = req.body;

                if (
                    !current_sector ||
                    !experience ||
                    !qualification ||
                    !brief_intro ||
                    !resume_url
                )
                    throw new ErrorHandler(
                        httpStatusCodes.BAD_REQUEST,
                        "All fields are required"
                    );

                // inserts the user into the database
                newUser = await userRepository.save({
                    name,
                    email,
                    password: hashedPassword,
                    role,
                    candidateDetails: {
                        current_sector,
                        experience,
                        qualification,
                        brief_intro,
                        resume_url,
                        linkedin_url,
                        github_url,
                        portfolio_url,
                    },
                });
            }

            const token: string = AuthHelper.generateJWTToken(
                newUser.id,
                newUser.email,
                newUser.role
            );

            new ResponseGenerator(httpStatusCodes.CREATED, {
                success: true,
                message: "User created successfully",
                token,
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                },
            }).send(res);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    public static async userLoginViaPassword(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { email, password } = req.body;

            if (!email || !password)
                throw new ErrorHandler(
                    httpStatusCodes.BAD_REQUEST,
                    "All fields are required"
                );

            const user = await userRepository.findOne({ where: { email } });

            if (!user)
                throw new ErrorHandler(
                    httpStatusCodes.BAD_REQUEST,
                    "User with this email does not exist"
                );

            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );

            if (!isPasswordValid)
                throw new ErrorHandler(
                    httpStatusCodes.BAD_REQUEST,
                    "Invalid password"
                );

            const token: string = AuthHelper.generateJWTToken(
                user.id,
                user.email,
                user.role
            );

            new ResponseGenerator(httpStatusCodes.OK, {
                success: true,
                message: "User logged in successfully",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            }).send(res);
        } catch (error) {
            next(error);
        }
    }

    public static async requestOTP(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { email } = req.body;

            if (!email)
                throw new ErrorHandler(
                    httpStatusCodes.BAD_REQUEST,
                    "All fields are required"
                );

            const user = await userRepository.findOne({ where: { email } });

            if (!user)
                throw new ErrorHandler(
                    httpStatusCodes.BAD_REQUEST,
                    "User with this email does not exist"
                );

            // generate a random 6 digit otp
            const otp = Math.floor(100000 + Math.random() * 900000);

            // save the otp to the database
            await userRepository.update(
                { id: user.id },
                {
                    login_otp: otp,
                    login_otp_expiry: new Date(Date.now() + 5 * 60 * 1000),
                }
            );

            // get the html template buffer
            const htmlTemplate = await fs.readFile(
                path.resolve(__dirname, "../../html-templates/otp.html"),
                "utf-8"
            );

            // generate the final html
            const htmlContent: string = htmlTemplate
                .toString()
                .replace("{{name}}", user.name)
                .replace("{{otp}}", otp.toString())
                .replace("{{context}}", "complete your login process");

            // send the otp to the user's email
            await transporter.sendEMail(
                user.email,
                "Job Portal - Your Login OTP",
                htmlContent
            );

            new ResponseGenerator(httpStatusCodes.OK, {
                success: true,
                message: "OTP sent successfully",
            }).send(res);
        } catch (error) {
            next(error);
        }
    }

    public static async resendOTP(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { email } = req.body;

            if (!email)
                throw new ErrorHandler(
                    httpStatusCodes.BAD_REQUEST,
                    "All fields are required"
                );

            const user = await userRepository.findOne({ where: { email } });

            if (!user)
                throw new ErrorHandler(
                    httpStatusCodes.BAD_REQUEST,
                    "User with this email does not exist"
                );

            if (user.login_otp_expiry > new Date())
                throw new ErrorHandler(
                    httpStatusCodes.BAD_REQUEST,
                    "OTP has already been sent"
                );

            // generate a random 6 digit otp
            const otp = Math.floor(100000 + Math.random() * 900000);

            // save the otp to the database
            await userRepository.update(
                { id: user.id },
                { login_otp: otp, login_otp_expiry: new Date() }
            );

            // get the html template buffer
            const htmlTemplate = await fs.readFile(
                path.resolve(__dirname, "../../html-templates/otp.html"),
                "utf-8"
            );

            // generate the final html
            const htmlContent: string = htmlTemplate
                .toString()
                .replace("{{name}}", user.name)
                .replace("{{otp}}", otp.toString())
                .replace("{{context}}", "complete your login process");

            // send the otp to the user's email
            await transporter.sendEMail(
                user.email,
                "Job Portal - Your Login OTP",
                htmlContent
            );

            new ResponseGenerator(httpStatusCodes.OK, {
                success: true,
                message: "OTP sent successfully",
            }).send(res);
        } catch (error) {
            next(error);
        }
    }

    public static async verifyOTP(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { email, otp } = req.body;

            if (!email || !otp)
                throw new ErrorHandler(
                    httpStatusCodes.BAD_REQUEST,
                    "All fields are required"
                );

            const user = await userRepository.findOne({ where: { email } });

            if (!user)
                throw new ErrorHandler(
                    httpStatusCodes.BAD_REQUEST,
                    "User with this email does not exist"
                );

            if (user.login_otp !== parseInt(otp))
                throw new ErrorHandler(
                    httpStatusCodes.BAD_REQUEST,
                    "Invalid OTP"
                );

            if (user.login_otp_expiry < new Date())
                throw new ErrorHandler(
                    httpStatusCodes.BAD_REQUEST,
                    "OTP expired"
                );

            // invalidate the otp
            await userRepository.update(
                { id: user.id },
                { login_otp: null, login_otp_expiry: null }
            );

            const token: string = AuthHelper.generateJWTToken(
                user.id,
                user.email,
                user.role
            );

            new ResponseGenerator(httpStatusCodes.OK, {
                success: true,
                message: "User logged in successfully",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            }).send(res);
        } catch (error) {
            next(error);
        }
    }
}
