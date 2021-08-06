import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({nullable: false, length: 50})
    name: string;

    @Column({nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({nullable: false, length: 1})
    active: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @BeforeInsert()
    defineDefaultValues() {
        this.active = 'S';
    }
}