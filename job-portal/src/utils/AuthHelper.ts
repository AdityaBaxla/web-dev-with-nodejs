import jsonwebtoken from "jsonwebtoken";

import { UserRole } from "./Enums";

export class AuthHelper {
    static generateJWTToken(
        userId: number,
        userEmail: string,
        userRole: UserRole
    ): string {
        return jsonwebtoken.sign(
            {
                id: userId,
                email: userEmail,
                role: userRole,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "10d",
            }
        );
    }
}
