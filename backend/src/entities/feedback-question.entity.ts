import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FeedbackForm } from './feedback-form.entity';

@Entity()
export class FeedbackQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
