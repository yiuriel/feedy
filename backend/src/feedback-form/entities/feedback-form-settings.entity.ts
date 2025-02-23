import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { FeedbackForm } from './feedback-form.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class FeedbackFormSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @Column()
  shareType: 'link' | 'email';

  @Column({ nullable: true })
  stepped: boolean;

  @Column()
  allowMultipleResponses: boolean;

  @Exclude()
  @Column({ nullable: true })
  emailDomainRestriction: string;

  @Exclude()
  @Column('simple-array', { nullable: true })
  invitedEmails: string[];

  @OneToOne(() => FeedbackForm, (form) => form.formSettings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  form: FeedbackForm;
}
