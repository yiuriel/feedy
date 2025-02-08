import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from 'src/entities/organization.entity';
import { Subscription } from '../entities/subscription.entity';
import { User } from '../entities/user.entity';
import { SubscriptionService } from '../services/subscription.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Organization, Subscription])],
  controllers: [UserController],
  providers: [SubscriptionService, UserService],
  exports: [SubscriptionService, UserService],
})
export class UserModule {}
