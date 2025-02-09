import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { FeedbackForm } from './feedback-form.entity';

@Entity()
export class FeedbackFormSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  shareType: 'link' | 'email';

  @Column()
  allowMultipleResponses: boolean;

  @Column({ nullable: true })
  emailDomainRestriction: string;

  @Column('simple-array', { nullable: true })
  invitedEmails: string[];

  @OneToOne(() => FeedbackForm, (form) => form.formSettings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  form: FeedbackForm;
}
