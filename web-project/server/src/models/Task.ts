import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./Project";
import { StatusColumn } from "./StatusColumn";
import { User } from "./User";

@Entity('task')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => StatusColumn, {eager: true})
    @JoinColumn({name: 'statuscolumn_id'})
    statusColumn: StatusColumn;

    @ManyToOne(() => User, {eager: true})
    @JoinColumn({name: 'user_id'})
    owner: User;

    @Column({nullable: false})
    title: string;

    @Column({type: 'text', nullable: true})
    description: string;

    @Column()
    priority: number;

    @ManyToOne(() => Project, {nullable: true})
    @JoinColumn({name: 'project_id'})  
    project: Project;

    @Column()
    percentage: number;

    @Column({type: 'date', nullable: true})
    startDate: Date;

    @Column({type: 'date', nullable: true})
    endDate: Date;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}