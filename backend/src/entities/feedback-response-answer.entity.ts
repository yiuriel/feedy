import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FeedbackResponse } from './feedback-response.entity';
import { FeedbackQuestion } from './feedback-question.entity';

@Entity()
export class FeedbackResponseAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => FeedbackResponse, (response) => response.answers, {
    onDelete: 'CASCADE',
  })
  response: FeedbackResponse;

  @ManyToOne(() => FeedbackQuestion, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  question: FeedbackQuestion;

  @Column({ type: 'text', nullable: true })
  textAnswer: string;

  @Column({ type: 'int', nullable: true })
  ratingAnswer: number;

  @Column('simple-array', { nullable: true })
  selectedOptions: string[];
}
