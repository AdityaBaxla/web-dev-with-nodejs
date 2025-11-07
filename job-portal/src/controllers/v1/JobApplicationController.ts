import { Request, Response, NextFunction } from "express";

// ENUMS
import { JobApplicationStatus } from "../../utils/Enums";

// REST ERRORS & RESPONSE
import ErrorHandler from "../../errors/ErrorHandler";
import httpStatusCodes from "../../errors/HttpCodes";
import ResponseGenerator from "../../utils/ResponseGenerator";

// REPOSITORIES
import {
    jobPostingRepository,
    jobApplicationRepository,
} from "../../utils/Repositories";

export class JobApplicationController {
    public static async applyForJob(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const requestUser = req["user"];

            const { job_posting_id } = req.body;

            if (!job_posting_id)
                throw new ErrorHandler(
                    httpStatusCodes.BAD_REQUEST,
                    "All fields are required"
                );

            // check if job posting exists
            const jobPosting = await jobPostingRepository.findOne({
                where: { id: job_posting_id },
            });

            if (!jobPosting)
                throw new ErrorHandler(
                    httpStatusCodes.BAD_REQUEST,
                    "Job posting does not exist"
                );

            // check if user has already applied for this job
            const application = await jobApplicationRepository.findOne({
                where: {
                    jobPosting: { id: job_posting_id },
                    user: { id: requestUser.id },
                },
            });

            if (application)
                throw new ErrorHandler(
                    httpStatusCodes.BAD_REQUEST,
                    "You have already applied for this job"
                );

            // create the application in the database
            await jobApplicationRepository.save({
                jobPosting: { id: job_posting_id },
                user: { id: requestUser.id },
            });

            // increment the number of applications for the job posting
            await jobPostingRepository.update(
                { id: job_posting_id },
                { no_of_applicants: jobPosting.no_of_applicants + 1 }
            );

            new ResponseGenerator(httpStatusCodes.OK, {
                success: true,
                message: "Application submitted successfully",
            }).send(res);
        } catch (error) {
            next(error);
        }
    }

    public static async getAllJobApplications(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const requestUser = req["user"];

            // read page size and page number from query params
            const pageSize = parseInt(req.query.page_size as string) || 10;
            const pageNumber = parseInt(req.query.page_number as string) || 1;

            // check if status is also provided for filters
            const status = req.query.status as string;

            if (
                status &&
                !Object.values(JobApplicationStatus).includes(
                    status as JobApplicationStatus
                )
            )
                throw new ErrorHandler(
                    httpStatusCodes.BAD_REQUEST,
                    "Invalid status"
                );

            const totalApplications = await jobApplicationRepository.count({
                where: {
                    user: { id: requestUser.id },
                    ...(status && { status: status as JobApplicationStatus }),
                },
            });

            const jobApplications = await jobApplicationRepository.find({
                where: {
                    user: { id: requestUser.id },
                    ...(status && { status: status as JobApplicationStatus }),
                },
                skip: (pageNumber - 1) * pageSize,
                take: pageSize,
            });

            new ResponseGenerator(httpStatusCodes.OK, {
                success: true,
                message: "Job applications fetched successfully",
                total: totalApplications,
                applications: jobApplications,
            }).send(res);
        } catch (error) {
            next(error);
        }
    }

    public static async updateApplicationStatus(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const requestUser = req["user"];

            const { application_id, status } = req.body;

            if (!application_id || !status)
                throw new ErrorHandler(
                    httpStatusCodes.BAD_REQUEST,
                    "All fields are required"
                );

            if (!Object.values(JobApplicationStatus).includes(status))
                throw new ErrorHandler(
                    httpStatusCodes.BAD_REQUEST,
                    "Invalid status"
                );

            // check if application exists
            const application = await jobApplicationRepository.findOne({
                where: { id: application_id },
                relations: { jobPosting: { user: true } },
            });

            if (!application)
                throw new ErrorHandler(
                    httpStatusCodes.BAD_REQUEST,
                    "Application does not exist"
                );

            if (application.jobPosting.user.id !== requestUser.id)
                throw new ErrorHandler(
                    httpStatusCodes.BAD_REQUEST,
                    "You are not authorized to update this application"
                );

            // update the application status in the database
            await jobApplicationRepository.update(
                { id: application_id },
                { status }
            );

            new ResponseGenerator(httpStatusCodes.OK, {
                success: true,
                message: "Application status updated successfully",
            }).send(res);
        } catch (error) {
            next(error);
        }
    }
}
