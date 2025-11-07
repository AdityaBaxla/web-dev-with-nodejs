import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { CandidateQualification, CompanySector } from "../utils/Enums";
import { User } from "./User.entity";

@Entity({ name: "candidate_details", synchronize: false })
export class CandidateDetail {
    // one to one relationship
    @OneToOne(() => User, (user) => user.candidateDetails)
    @JoinColumn({ name: "user_id" })
    user: User;

    @PrimaryColumn()
    user_id: number;

    @Column({ type: "enum", enum: CompanySector })
    current_sector: CompanySector;

    @Column()
    experience: number; // in months

    @Column({ type: "enum", enum: CandidateQualification })
    qualification: CandidateQualification;

    @Column()
    brief_intro: string;

    @Column()
    resume_url: string;

    @Column({ nullable: true })
    linkedin_url: string;

    @Column({ nullable: true })
    github_url: string;

    @Column({ nullable: true })
    portfolio_url: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
