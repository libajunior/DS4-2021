import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./Project";
import { User } from "./User";

@Entity('statuscolumn')
export class StatusColumn {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 20})
    name: string;

    @Column({nullable: false, length: 7})
    color: string;

    @ManyToOne(() => Project, {nullable: false})
    @JoinColumn({name: 'project_id'})
    project: Project;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

}