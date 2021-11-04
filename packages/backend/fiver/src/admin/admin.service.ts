import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import * as crypto from 'crypto-helper';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async createAdminKeys(){
    const mnemonic = crypto.generateMnemonicString();
    const ppk = crypto.generatePublicAndPrivateKey(mnemonic);
    const admin = new Admin();
    admin.private_key = ppk.privateKey;
    admin.public_key= ppk.publicKey;
    await this.adminRepository.save([admin]);
    return admin;
  }

  async findAdminKeys() {
    try {
      const adminList = await this.adminRepository.find();
      return adminList;
    } catch (error) {
      return new NotFoundException('Users Not Found');
    }
  }
}
