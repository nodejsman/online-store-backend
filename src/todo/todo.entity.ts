import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.todos)
    user: User;

    @Column({ type: 'varchar', length: 120 })
    title: string;

    @Column({ type: 'boolean', default: false })
    completed: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}