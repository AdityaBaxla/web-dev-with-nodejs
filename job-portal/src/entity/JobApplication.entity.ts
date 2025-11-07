import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { JobApplicationStatus } from "../utils/Enums";
import { User } from "./User.entity";
import { JobPosting } from "./JobPosting.entity";

@Entity({ name: "job_applications", synchronize: true })
@Index(["jobPosting", "user"], { unique: true })
export class JobApplication {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: JobApplicationStatus,
        default: JobApplicationStatus.PENDING,
    })
    status: JobApplicationStatus;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // many to one relationship
    @ManyToOne(() => JobPosting, (jobPosting) => jobPosting.applications)
    @JoinColumn({ name: "job_posting_id" })
    jobPosting: JobPosting;

    // many to one relationship
    @ManyToOne(() => User, (user) => user.jobPostings)
    @JoinColumn({ name: "user_id" })
    user: User;
}
