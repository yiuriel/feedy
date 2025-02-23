import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { FeedbackResponse } from './feedback-response.entity';

@Entity()
export class FeedbackResponseMetadata {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => FeedbackResponse, (response) => response.metadata, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  response: FeedbackResponse;

  @Column({ nullable: true })
  userAgent: string;

  @Column({ nullable: true })
  ipAddress: string;
}
