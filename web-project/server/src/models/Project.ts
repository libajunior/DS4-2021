import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StatusColumn } from "./StatusColumn";
import { Task } from "./Task";
import { User } from "./User";

@Entity('project')
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 50})
    name: string;

    @Column('text', {nullable: false})
    description: string;

    @ManyToOne(() => User, {nullable: true, eager: true})
    @JoinColumn({name: 'user_id'})
    owner: User;

    @OneToMany(() => StatusColumn, statuscolumn => statuscolumn.project, {
        eager: true,
        cascade: true
    })    
    statusColumns: StatusColumn[];

    @OneToMany(() => Task, task => task.project, {
        eager: true,
        cascade: true
    })
    tasks: Task[];
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

}