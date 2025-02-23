import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';
import { FeedbackForm } from './feedback-form.entity';
import { QuestionType } from '../../common/enums/question-type.enum';

@Entity()
@Index(['form', 'type'])
export class FeedbackQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  type: QuestionType;

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
