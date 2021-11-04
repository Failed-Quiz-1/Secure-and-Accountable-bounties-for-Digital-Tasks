import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/user.entity';
import * as crypto from 'crypto-helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      name: Equal(createUserDto.name),
    });
    if (user) throw new BadRequestException('Username already exist');
    const mnemonic = crypto.generateMnemonicString();
    const privatePubKeyPair = crypto.generatePublicAndPrivateKey(mnemonic);
    const newUser = new Users();
    newUser.name = createUserDto.name;
    newUser.password = createUserDto.password;
    newUser.public_key = privatePubKeyPair.publicKey;
    await this.usersRepository.save([newUser]);
    return mnemonic;
  }

  async findAllUsers() {
    try {
      const userList = await this.usersRepository.find({
        order: {
          id: 'ASC',
        },
      });
      return userList;
    } catch (error) {
      return new NotFoundException('Users Not Found');
    }
  }

  async findByUserId(id: number) {
    try {
      const user = await this.usersRepository.findOneOrFail({
        id: Equal(id),
      });
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async login(createUserDto: CreateUserDto) {
    try {
      const user = await this.usersRepository.findOneOrFail({
        name: Equal(createUserDto.name),
      });
      if (user.password === createUserDto.password) return user;
      return new BadRequestException(
        'Incorrect username, password combination',
      );
    } catch (error) {
      return new BadRequestException(
        'Incorrect username, password combination',
      );
    }
  }
}
