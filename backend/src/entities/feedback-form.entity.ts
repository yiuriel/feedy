import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Organization } from './organization.entity';
import { FeedbackResponse } from './feedback-response.entity';
import { User } from './user.entity';
import { FeedbackQuestion } from './feedback-question.entity';
import { FeedbackFormSettings } from './feedback-form-settings.entity';

@Entity()
export class FeedbackForm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  responseCount: number;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  customThankYouPage: string;

  // TODO: Add theme-related fields back later

  @Column({ default: false })
  allowEmbedding: boolean;

  @ManyToOne(() => Organization, (org) => org.feedbackForms)
  organization: Organization;

  @ManyToOne(() => User, (user) => user.id)
  createdBy: User;

  @OneToMany(() => FeedbackResponse, (response) => response.form)
  responses: FeedbackResponse[];

  @OneToMany(() => FeedbackQuestion, (question) => question.form)
  questions: FeedbackQuestion[];

  @OneToOne(() => FeedbackFormSettings, (settings) => settings.form)
  formSettings: FeedbackFormSettings;

  @Column({ unique: true })
  accessToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
