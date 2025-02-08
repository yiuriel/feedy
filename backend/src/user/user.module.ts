import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Organization } from 'src/entities/organization.entity';
import { User } from '../entities/user.entity';
import { UserController } from './user.controller';
import { Subscription } from '../entities/subscription.entity';
import { SubscriptionService } from '../services/subscription.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Organization, Subscription])],
  controllers: [UserController],
  providers: [AuthService, SubscriptionService],
  exports: [AuthService, SubscriptionService],
})
export class UserModule {}
