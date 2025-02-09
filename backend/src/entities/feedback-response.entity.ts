import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { FeedbackForm } from './feedback-form.entity';
import { FeedbackResponseAnswer } from './feedback-response-answer.entity';
import { FeedbackResponseMetadata } from './feedback-response-metadata.entity';

@Entity()
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

  @CreateDateColumn()
  submittedAt: Date;
}
