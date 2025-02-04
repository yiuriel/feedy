import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Organization } from './organization.entity';

// Define the available subscription plans
export type SubscriptionPlan = 'free' | 'pro';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // The organization this subscription belongs to
  @OneToOne(() => Organization)
  @JoinColumn()
  organization: Organization;

  // The current subscription plan
  @Column({
    type: 'enum',
    enum: ['free', 'pro'],
    default: 'free',
  })
  plan: SubscriptionPlan;

  // Number of forms created in the current month
  @Column({ default: 0 })
  formsCreatedThisMonth: number;

  // Number of responses received in the current month
  @Column({ default: 0 })
  responsesThisMonth: number;

  // The date when the monthly counters were last reset
  @Column({ type: 'timestamp' })
  lastResetDate: Date;

  // For pro subscriptions: when the subscription will end
  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  // Timestamps for auditing
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Helper method to check if organization can create more forms
  canCreateForm(): boolean {
    if (this.plan === 'pro') return true;
    return this.formsCreatedThisMonth < 1; // Free plan limit is 1 form
  }

  // Helper method to check if form can accept more responses
  canAcceptResponses(): boolean {
    if (this.plan === 'pro') return true;
    return this.responsesThisMonth < 50; // Free plan limit is 50 responses
  }
}
