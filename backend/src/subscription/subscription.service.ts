import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Subscription,
  SubscriptionPlan,
} from '../entities/subscription.entity';
import { Organization } from '../entities/organization.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  /**
   * Create a new subscription for an organization
   * @param organization The organization to create the subscription for
   * @param plan The subscription plan (defaults to 'free')
   */
  async createSubscription(
    organization: Organization,
    plan: SubscriptionPlan = 'free',
  ): Promise<Subscription> {
    const subscription = this.subscriptionRepository.create({
      organization,
      plan,
      lastResetDate: new Date(),
      // Set expiration date for pro plans (30 days from now)
      expiresAt:
        plan === 'pro' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null,
    });

    return this.subscriptionRepository.save(subscription);
  }

  /**
   * Check if an organization can create a new form
   * @param organizationId The ID of the organization
   * @returns boolean indicating if organization can create a form
   */
  async canCreateForm(organizationId: string): Promise<boolean> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { organization: { id: organizationId } },
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    return subscription.canCreateForm();
  }

  /**
   * Check if a form can accept more responses
   * @param organizationId The ID of the organization that owns the form
   * @returns boolean indicating if form can accept more responses
   */
  async canAcceptResponses(organizationId: string): Promise<boolean> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { organization: { id: organizationId } },
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    return subscription.canAcceptResponses();
  }

  /**
   * Increment the form count for an organization
   * @param organizationId The ID of the organization
   */
  async incrementFormCount(organizationId: string): Promise<void> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { organization: { id: organizationId } },
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    // Check if we need to reset monthly counters
    const now = new Date();
    const lastReset = new Date(subscription.lastResetDate);
    if (
      lastReset.getMonth() !== now.getMonth() ||
      lastReset.getFullYear() !== now.getFullYear()
    ) {
      subscription.formsCreatedThisMonth = 0;
      subscription.responsesThisMonth = 0;
      subscription.lastResetDate = now;
    }

    subscription.formsCreatedThisMonth++;
    await this.subscriptionRepository.save(subscription);
  }

  /**
   * Increment the response count for an organization
   * @param organizationId The ID of the organization that owns the form
   */
  async incrementResponseCount(organizationId: string): Promise<void> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { organization: { id: organizationId } },
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    // Check if we need to reset monthly counters
    const now = new Date();
    const lastReset = new Date(subscription.lastResetDate);
    if (
      lastReset.getMonth() !== now.getMonth() ||
      lastReset.getFullYear() !== now.getFullYear()
    ) {
      subscription.formsCreatedThisMonth = 0;
      subscription.responsesThisMonth = 0;
      subscription.lastResetDate = now;
    }

    subscription.responsesThisMonth++;
    await this.subscriptionRepository.save(subscription);
  }

  /**
   * Update an organization's subscription plan
   * @param organizationId The ID of the organization
   * @param plan The new subscription plan
   */
  async updateSubscriptionPlan(
    organizationId: string,
    plan: SubscriptionPlan,
  ): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { organization: { id: organizationId } },
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    subscription.plan = plan;
    if (plan === 'pro') {
      subscription.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    } else {
      subscription.expiresAt = null;
    }

    return this.subscriptionRepository.save(subscription);
  }
}
