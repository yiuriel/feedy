import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';
import { FeedbackForm } from './feedback-form.entity';

@Entity()
@Index(['form', 'type'])
export class FeedbackQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  type: 'text' | 'rating' | 'multiple_choice' | 'checkbox';

  @Column()
  question: string;

  @Column()
  required: boolean;

  @Column('simple-array', { nullable: true })
  options: string[];

  @Column({ nullable: true })
  minRating: number;

  @Column({ nullable: true })
  maxRating: number;

  @ManyToOne(() => FeedbackForm, (form) => form.questions, {
    onDelete: 'CASCADE',
  })
  form: FeedbackForm;
}
