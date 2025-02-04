import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Organization } from './organization.entity';
import { FeedbackResponse } from './feedback-response.entity';
import { User } from './user.entity';

@Entity()
export class FeedbackForm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'json' })
  questions: {
    id: string;
    type: 'text' | 'rating' | 'multipleChoice' | 'checkbox';
    question: string;
    required: boolean;
    options?: string[]; // For multipleChoice and checkbox types
    minRating?: number; // For rating type
    maxRating?: number; // For rating type
  }[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  @Column({ default: 0 })
  responseCount: number;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  customThankYouPage: string;

  @Column({ type: 'json', nullable: true })
  theme: {
    primaryColor?: string;
    backgroundColor?: string;
    fontFamily?: string;
    customCss?: string;
  };

  @Column({ default: false })
  allowEmbedding: boolean;

  @Column({ type: 'json', nullable: true })
  qrCodeSettings: {
    enabled: boolean;
    customLogo?: string;
    foregroundColor?: string;
  };

  @ManyToOne(() => Organization, (org) => org.feedbackForms, {
    onDelete: 'CASCADE',
  })
  organization: Organization;

  @ManyToOne(() => User, (user) => user.id)
  createdBy: User;

  @OneToMany(() => FeedbackResponse, (response) => response.form)
  responses: FeedbackResponse[];

  @Column({ type: 'simple-json' })
  settings: {
    shareType: 'link' | 'email';
    allowMultipleResponses: boolean;
    emailDomainRestriction?: string; // Optional email domain restriction
    invitedEmails?: string[]; // List of invited email addresses if shareType is 'email'
  };

  @Column({ unique: true })
  accessToken: string; // Unique token for accessing the form via link

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
