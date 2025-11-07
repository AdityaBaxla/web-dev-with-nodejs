import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { CandidateQualification, CompanySector } from "../utils/Enums";
import { User } from "./User.entity";
import { JobApplication } from "./JobApplication.entity";

@Entity({ name: "job_postings", synchronize: false })
export class JobPosting {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    brief: string;

    @Column({ type: "enum", enum: CandidateQualification })
    min_qualification: CandidateQualification;

    @Column({ type: "enum", enum: CompanySector })
    sector: CompanySector;

    @Column()
    no_of_vacancies: number;

    @Column({ default: 0 })
    no_of_applicants: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // many to one relationship
    @ManyToOne(() => User, (user) => user.jobPostings)
    @JoinColumn({ name: "user_id" })
    user: User;

    // one to many relationship
    @OneToMany(
        () => JobApplication,
        (jobApplication) => jobApplication.jobPosting
    )
    applications: JobApplication[];
}
