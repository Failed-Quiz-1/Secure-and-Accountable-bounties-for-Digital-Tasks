import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateDraftDto } from './dto/create-draft.dto';
import { RejectDraftDto } from './dto/update-draft.dto';
import { Draft } from './entities/draft.entity';
import * as crypto from 'crypto-helper';
import { SignatureMessage } from 'crypto-helper';
@Injectable()
export class DraftService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Draft)
    private draftRepository: Repository<Draft>,
  ) {}

  async getCurrDateTime() {
    const currentdate = new Date();
    const datetime =
      'Last Sync: ' +
      currentdate.getDate() +
      '/' +
      (currentdate.getMonth() + 1) +
      '/' +
      currentdate.getFullYear() +
      ' @ ' +
      currentdate.getHours() +
      ':' +
      currentdate.getMinutes() +
      ':' +
      currentdate.getSeconds();
    return datetime;
  }
  async create(createDraftDto: CreateDraftDto) {
    const newDraft = new Draft();
    const user = await this.usersRepository.findOne({
      id: createDraftDto.userid,
    });
    const task = await this.taskRepository.findOne({
      where: [{ id: createDraftDto.taskid }],
      relations: ['poster'],
    });
    newDraft.author = user;
    newDraft.task = task;
    const draft_msg = JSON.parse(createDraftDto.signatureMessage);
    const isCorrectMnemonic = crypto.verifySignature(draft_msg,createDraftDto.signature,user.public_key);
    newDraft.draft_signature = createDraftDto.signature;
    newDraft.draft_sig_message = draft_msg;
    if (isCorrectMnemonic) {
      await this.draftRepository.save([newDraft]);
      return newDraft;
    }
    throw new BadRequestException('Incorrect message!');
  }

  async update(id: number, rejectDraftDto: RejectDraftDto) {
    const draft = await this.draftRepository.findOneOrFail({
      where: [{ id: id }],
      relations: ['author', 'task'],
    });
    const reject_msg = JSON.parse(rejectDraftDto.signatureMessage);
    const isCorrectMnemonic = crypto.verifySignature(reject_msg,rejectDraftDto.signature,draft.author.public_key);
    draft.reject_sig_message = reject_msg;
    draft.reject_signature = rejectDraftDto.signature;
    if (isCorrectMnemonic) {
      await this.draftRepository.save([draft]);
      return draft;
    }
    throw new BadRequestException('Incorrect message!');
  }

  async findByTaskId(taskid: number) {
    try {
      const task = await this.taskRepository.findOne({
        id: taskid,
      });
      const allDrafts = await this.draftRepository.find({
        where: [{ task: task }],
        relations: ['author', 'task'],
      });
      return allDrafts;
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }

  async findByUserId(userid: number) {
    try {
      const user = await this.usersRepository.findOne({
        id: userid,
      });
      const allDrafts = await this.draftRepository.find({
        where: [{ author: user }],
        relations: ['author', 'task'],
      });
      return allDrafts;
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }
}
