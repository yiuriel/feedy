import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, (employee) => employee.feedbackGiven)
  employee: Employee;

  @ManyToOne(() => Employee, (employee) => employee.feedbackReceived)
  recipient: Employee;

  @Column('text')
  content: string;

  @Column({ type: 'int', nullable: true })
  rating: number;

  @Column({ default: false })
  isAnonymous: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  category: string;
}
