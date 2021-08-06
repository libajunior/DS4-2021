import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./Project";
import { StatusColumn } from "./StatusColumn";
import { TaskComment } from "./TaskComment";
import { User } from "./User";

@Entity('task')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => StatusColumn, {nullable: true})
    @JoinColumn({name: 'statuscolumn_id'})
    statusColumn: StatusColumn;

    @ManyToOne(() => User, {nullable: true})
    @JoinColumn({name: 'user_id'})
    owner: User;

    @Column({nullable: false})
    title: string;

    @Column('text', {nullable: true})
    description: string;

    @Column()
    priority: number;

    @OneToMany(() => TaskComment, taskcomment => taskcomment.task, {
        eager: true,
        cascade: true
    })
    comments: TaskComment[];

    @ManyToOne(() => Project, {nullable: true})
    @JoinColumn({name: 'project_id'})  
    project: Project;

    @Column()
    percentage: number;

    @Column({type: 'date'})
    startDate: Date;

    @Column({type: 'date'})
    endDate: Date;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}