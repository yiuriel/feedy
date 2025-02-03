import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { FeedbackForm } from './feedback-form.entity';

@Entity()
export class FeedbackResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => FeedbackForm, (form) => form.responses, {
    onDelete: 'CASCADE',
  })
  form: FeedbackForm;

  @Column({ type: 'json' })
  answers: {
    questionId: string;
    answer: string | number | string[]; // Can be text, rating number, or selected options
  }[];

  @Column({ type: 'json', nullable: true })
  metadata: {
    userAgent?: string;
    ipAddress?: string;
    // We can add more metadata if needed, but being careful not to store identifying information
  };

  @CreateDateColumn()
  submittedAt: Date;
}
