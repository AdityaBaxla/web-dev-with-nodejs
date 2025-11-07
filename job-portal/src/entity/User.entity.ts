import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { UserRole } from "../utils/Enums";
import { RecruiterDetail } from "./RecruiterDetail.entity";
import { CandidateDetail } from "./CandidateDetail.entity";
import { JobPosting } from "./JobPosting.entity";
import { JobApplication } from "./JobApplication.entity";

@Entity({ name: "users", synchronize: false })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: "enum", enum: UserRole })
    role: UserRole;

    @Column({ nullable: true })
    login_otp: number;

    @Column({ nullable: true, type: "timestamptz" })
    login_otp_expiry: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // one to one relationship
    @OneToOne(
        () => RecruiterDetail,
        (recruiterDetail) => recruiterDetail.user,
        { cascade: true }
    )
    recruiterDetails: RecruiterDetail;

    // one to one relationship
    @OneToOne(
        () => CandidateDetail,
        (candidateDetail) => candidateDetail.user,
        { cascade: true }
    )
    candidateDetails: CandidateDetail;

    // one to many relationship
    @OneToMany(() => JobPosting, (jobPosting) => jobPosting.user)
    jobPostings: JobPosting[];

    // one to many relationship
    @OneToMany(() => JobApplication, (jobApplication) => jobApplication.user)
    jobApplications: JobApplication[];
}
