import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Subscription } from './subscription.entity';
import { FeedbackForm } from './feedback-form/feedback-form.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  name: string;

  @Index({ unique: true })
  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  description: string;

  @Index()
  @Column({ nullable: true })
  industry: string;

  @Column({ nullable: true })
  size: string;

  // Organization's subscription
  @OneToOne(() => Subscription, (subscription) => subscription.organization)
  subscription: Subscription;

  @OneToMany(() => User, (user) => user.organization)
  users: User[];

  @OneToMany(() => FeedbackForm, (form) => form.organization)
  feedbackForms: FeedbackForm[];

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
}
