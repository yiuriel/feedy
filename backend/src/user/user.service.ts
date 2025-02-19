import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    if (!id) {
      return null;
    }

    return await this.userRepository.findOne({
      where: { id },
      relations: ['organization'],
    });
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async update(id: string, user: User): Promise<User> {
    return await this.userRepository.save({ id, ...user });
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
