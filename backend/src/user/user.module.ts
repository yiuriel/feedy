import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from '../organization/entities/organization.entity';
import { Subscription } from '../subscription/entities/subscription.entity';
import { User } from './entities/user.entity';
import { SubscriptionService } from '../subscription/subscription.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Organization, Subscription])],
  controllers: [UserController],
  providers: [SubscriptionService, UserService],
  exports: [SubscriptionService, UserService],
})
export class UserModule {}
