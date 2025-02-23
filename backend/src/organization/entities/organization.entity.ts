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
import { Exclude } from 'class-transformer';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { User } from 'src/user/entities/user.entity';
import { FeedbackForm } from 'src/feedback-form/entities/feedback-form.entity';

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
