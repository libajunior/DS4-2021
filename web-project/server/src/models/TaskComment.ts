import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Task } from "./Task";
import { User } from "./User";

@Entity('taskcomment')
export class TaskComment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {nullable: false})
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column('text', {nullable: false})
    description: string;

    @ManyToOne(() => Task, {nullable: false})
    @JoinColumn({name: 'task_id'})
    task: Task;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}