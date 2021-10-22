import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}
  async findAdminKeys() {
    try {
      const adminList = await this.adminRepository.find();
      return adminList;
    } catch (error) {
      return new NotFoundException('Users Not Found');
    }
  }
}
