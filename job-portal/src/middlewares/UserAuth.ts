import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";

// REST ERRORS & RESPONSE
import ErrorHandler from "../errors/ErrorHandler";
import httpStatusCodes from "../errors/HttpCodes";

// ENTITIES
import { User } from "../entity/User.entity";

// REPOSITORIES
import { userRepository } from "../utils/Repositories";

export class UserAuth {
    public static async verifyJWT(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader)
                throw new ErrorHandler(
                    httpStatusCodes.UN_AUTHORIZED,
                    "Authorization header is missing"
                );

            // extract the token from the header
            const token = authHeader.split(" ")[1];

            // verify the token
            const decoded = jsonwebtoken.verify(
                token,
                process.env.JWT_SECRET as string
            );

            if (!decoded)
                throw new ErrorHandler(
                    httpStatusCodes.FORBIDDEN,
                    "Invalid token"
                );

            // get the user
            const user: User = await userRepository.findOne({
                where: { id: decoded.id },
            });

            if (!user)
                throw new ErrorHandler(
                    httpStatusCodes.FORBIDDEN,
                    "User does not exist"
                );

            // attach the user to the request object
            req["user"] = user;
            next();
        } catch (error) {
            next(error);
        }
    }
}
