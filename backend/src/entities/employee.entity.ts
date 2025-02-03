import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Feedback } from './feedback.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  department: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Feedback, (feedback) => feedback.employee)
  feedbackGiven: Feedback[];

  @OneToMany(() => Feedback, (feedback) => feedback.recipient)
  feedbackReceived: Feedback[];
}
