import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Organization } from 'src/organization/entities/organization.entity';

export enum QuestionType {
  TEXT = 'text',
  RATING = 'rating',
  MULTIPLE_CHOICE = 'multiple_choice',
  CHECKBOX = 'checkbox',
}

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  type: QuestionType;

  @Column('simple-array', { nullable: true })
  options: string[];

  @ManyToOne(() => Organization)
  organization: Organization;

  @Column()
  organizationId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;
}
