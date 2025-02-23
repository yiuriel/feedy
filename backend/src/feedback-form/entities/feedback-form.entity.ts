import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { FeedbackQuestion } from './feedback-question.entity';
import { FeedbackFormSettings } from './feedback-form-settings.entity';
import { Exclude, Expose } from 'class-transformer';
import { FeedbackResponse } from './response/feedback-response.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
@Index(['isActive', 'organization'])
@Index(['accessToken', 'isActive'])
export class FeedbackForm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ length: 30 })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Index()
  @Exclude()
  @Column({ default: true })
  isActive: boolean;

  @Index()
  @Column({ default: 0 })
  responseCount: number;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @Expose()
  get hasPassword(): boolean {
    return !!this.password;
  }

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

  @Index()
  @Column({ unique: true })
  accessToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
