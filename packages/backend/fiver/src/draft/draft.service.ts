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
import { Job } from 'src/job/entities/job.entity';
@Injectable()
export class DraftService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Draft)
    private draftRepository: Repository<Draft>,
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  async getCurrDateTime() {
    const currentdate = new Date();
    const datetime =
      'Date: ' +
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
      relations: ['job'],
    });
    const job = await this.jobRepository.findOne({
      where: [{ id: task.job.id }],
      relations: ['poster'],
    })
    newDraft.author = user;
    newDraft.task = task;
    const ppk = crypto.generatePublicAndPrivateKey(createDraftDto.mnemonic);
    const posterid = job.poster.id;
    const newMessage = {
      fromUserId: createDraftDto.userid,
      toUserId: posterid,
      taskId: createDraftDto.taskid,
      createdOn: await this.getCurrDateTime(),
      step: 0,
      status: 'POSTED',
    };
    const draft_msg = JSON.stringify(newMessage);
    const draft_signature = crypto.createSignature(newMessage, ppk.privateKey);
    newDraft.draft_signature = draft_signature;
    newDraft.draft_sig_message = draft_msg;

    const isCorrectMnemonic = crypto.verifySignature(
      newMessage,
      draft_signature,
      ppk.publicKey,
    );
    if (isCorrectMnemonic) {
      newDraft.filename = createDraftDto.filepath;
      await this.draftRepository.save([newDraft]);
      return newDraft;
    }
    throw new BadRequestException('Incorrect mnemonic string!');
  }

  async update(id: number, rejectDraftDto: RejectDraftDto) {
    const draft = await this.draftRepository.findOneOrFail({
      where: [{ id: id }],
      relations: ['author', 'task'],
    });
    const task = await this.taskRepository.findOneOrFail({
      where: [{ id: draft.task.id }],
      relations: ['job'],
    });
    const job = await this.jobRepository.findOneOrFail({
      where: [{ id: task.job.id }],
      relations: ['poster'],
    });
    const newMessage = {
      fromUserId: job.poster.id,
      toUserId: draft.author.id,
      taskId: draft.task.id,
      createdOn: await this.getCurrDateTime(),
      step: -1,
      status: 'REJECTED',
    };
    const ppk = crypto.generatePublicAndPrivateKey(rejectDraftDto.mnemonic);
    if (ppk.publicKey !== job.poster.public_key) {
      throw new BadRequestException('Incorrect mnemonic string!');
    }
    const reject_msg = JSON.stringify(newMessage);
    const reject_signature = crypto.createSignature(newMessage, ppk.privateKey);
    draft.reject_sig_message = reject_msg;
    draft.reject_signature = reject_signature;
    const isCorrectMnemonic = crypto.verifySignature(
      newMessage,
      reject_signature,
      ppk.publicKey,
    );
    if (isCorrectMnemonic) {
      await this.draftRepository.save([draft]);
      return draft;
    }
    throw new BadRequestException('Incorrect mnemonic string!');
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
