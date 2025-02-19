import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  Index,
} from 'typeorm';
import { FeedbackForm } from '../feedback-form.entity';
import { FeedbackResponseAnswer } from './feedback-response-answer.entity';
import { FeedbackResponseMetadata } from './feedback-response-metadata.entity';

@Entity()
@Index(['form', 'submittedAt'])
export class FeedbackResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => FeedbackForm, (form) => form.responses, {
    onDelete: 'CASCADE',
  })
  form: FeedbackForm;

  @OneToMany(() => FeedbackResponseAnswer, (answer) => answer.response, {
    cascade: true,
  })
  answers: FeedbackResponseAnswer[];

  @OneToOne(() => FeedbackResponseMetadata, (metadata) => metadata.response, {
    cascade: true,
  })
  metadata: FeedbackResponseMetadata;

  @Index()
  @CreateDateColumn()
  submittedAt: Date;
}
