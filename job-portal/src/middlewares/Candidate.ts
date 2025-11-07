import { Request, Response, NextFunction } from "express";

// REST ERRORS & RESPONSE
import ErrorHandler from "../errors/ErrorHandler";
import httpStatusCodes from "../errors/HttpCodes";

// ENTITIES
import { User } from "../entity/User.entity";

// ENUMS
import { UserRole } from "../utils/Enums";

export class Candidate {
    public static async verifyCandidateRole(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const requestUser: User = req["user"];

            if (requestUser.role !== UserRole.CANDIDATE)
                throw new ErrorHandler(
                    httpStatusCodes.FORBIDDEN,
                    "You are not authorized to perform this operation"
                );
            next();
        } catch (error) {
            next(error);
        }
    }
}
