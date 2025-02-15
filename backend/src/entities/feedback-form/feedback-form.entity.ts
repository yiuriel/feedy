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
import { Organization } from '../organization.entity';
import { User } from '../user.entity';
import { FeedbackQuestion } from './feedback-question.entity';
import { FeedbackFormSettings } from './feedback-form-settings.entity';
import { Exclude } from 'class-transformer';
import { FeedbackResponse } from './response/feedback-response.entity';

@Entity()
export class FeedbackForm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Exclude()
  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  responseCount: number;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  customThankYouPage: string;

  // TODO: Add theme-related fields back later

  @Exclude()
  @Column({ default: false })
  allowEmbedding: boolean;

  @Exclude()
  @ManyToOne(() => Organization, (org) => org.feedbackForms)
  organization: Organization;

  @Exclude()
  @ManyToOne(() => User, (user) => user.id)
  createdBy: User;

  @OneToMany(() => FeedbackResponse, (response) => response.form)
  responses: FeedbackResponse[];

  @OneToMany(() => FeedbackQuestion, (question) => question.form)
  questions: FeedbackQuestion[];

  @OneToOne(() => FeedbackFormSettings, (settings) => settings.form)
  formSettings: FeedbackFormSettings;

  // @Exclude()
  @Column({ unique: true })
  accessToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
