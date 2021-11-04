import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApproveTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import * as crypto from 'crypto-helper';
import { Draft } from 'src/draft/entities/draft.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { ConnectableObservable } from 'rxjs';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Draft)
    private draftRepository: Repository<Draft>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
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

  async create(createTaskDto: CreateTaskDto) {
    try {
      const newTask = new Task();
      newTask.name = createTaskDto.taskname;
      newTask.description = createTaskDto.description;
      newTask.status = 'POSTED';
      const user = await this.usersRepository.findOneOrFail({
        id: createTaskDto.userid,
      });
      newTask.poster = user;
      await this.taskRepository.save([newTask]);
      return newTask;
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  async findAll() {
    const allTasks = await this.taskRepository.find({
      relations: ['poster'],
    });
    return allTasks;
  }

  async findOne(id: number) {
    try {
      const task = await this.taskRepository.findOneOrFail({
        where: [{ id: id }],
        relations: ['poster'],
      });
      return task;
    } catch (e) {
      return new NotFoundException('Task not found');
    }
  }

  async approve(id: number, approveTaskDto: ApproveTaskDto) {
    const task = await this.taskRepository.findOne({
      where: [{ id: id }],
      relations: ['poster'],
    });
    if (!task) throw new NotFoundException('Task not found!');
    const draft = await this.draftRepository.findOne({
      where: [{ id: approveTaskDto.approved_draftid }],
      relations: ['author', 'task'],
    });
    if (!draft) throw new NotFoundException('Draft not found!');
    task.status = 'APPROVED';
    //task.payment_signature = approveTaskDto.passphrase;
    task.approval_draft_id = approveTaskDto.approved_draftid;
    const ppk = crypto.generatePublicAndPrivateKey(approveTaskDto.mnemonic);
    if (ppk.publicKey !== task.poster.public_key) {
      throw new NotFoundException('Incorrect mnemonic string');
    }
    const newMessage: crypto.SignatureMessage = {
      fromUserId: task.poster.id,
      toUserId: draft.author.id,
      taskId: id,
      createdOn: await this.getCurrDateTime(),
      status: 'APPROVED',
    };
    task.payment_sig_message = JSON.stringify(newMessage);
    const payment_signature = crypto.createSignature(
      newMessage,
      ppk.privateKey,
    );
    task.payment_signature = payment_signature;
    const isCorrectMnemonic = crypto.verifySignature(
      newMessage,
      payment_signature,
      ppk.publicKey,
    );
    if (isCorrectMnemonic) {
      await this.taskRepository.save([task]);
      return task;
    }
    throw new NotFoundException('Incorrect mnemonic string');
  }

  async releaseIP(id, approveTaskDto: ApproveTaskDto) {
    const task = await this.taskRepository.findOneOrFail({
      where: [{ id: id }],
      relations: ['poster'],
    });
    if (!task) throw new NotFoundException('Task not found!');
    task.status = 'COMPLETED';
    const draft = await this.draftRepository.findOne({
      where: [{ id: task.approval_draft_id }],
      relations: ['author', 'task'],
    });
    if (!draft) throw new NotFoundException('Draft not found!');
    const ppk = crypto.generatePublicAndPrivateKey(approveTaskDto.mnemonic);
    if (ppk.publicKey !== draft.author.public_key) {
      throw new NotFoundException('Incorrect mnemonic string');
    }
    const newMessage: crypto.SignatureMessage = {
      fromUserId: task.poster.id,
      toUserId: draft.author.id,
      taskId: id,
      createdOn: await this.getCurrDateTime(),
      status: 'COMPLETED',
    };
    task.ip_sig_message = JSON.stringify(newMessage);
    const ip_signature = crypto.createSignature(newMessage, ppk.privateKey);
    task.ip_signature = ip_signature;
    const isCorrectMnemonic = crypto.verifySignature(
      newMessage,
      ip_signature,
      ppk.publicKey,
    );
    if (isCorrectMnemonic) {
      await this.taskRepository.save([task]);
    } else {
      throw new NotFoundException('Incorrect mnemonic string');
    }
    // Release both IP and payment
    const res = await this.releasePaymentAndIP(id);
    return res;
  }

  async releasePaymentAndIP(taskid) {
    const task = await this.taskRepository.findOneOrFail({
      where: [{ id: taskid }],
      relations: ['poster'],
    });
    if (!task) throw new NotFoundException('Task not found!');
    task.status = 'RELEASED_IP_AND_PAYMENT';
    const draft = await this.draftRepository.findOne({
      where: [{ id: task.approval_draft_id }],
      relations: ['author', 'task'],
    });
    if (!draft) throw new NotFoundException('Draft not found!');
    if (!task.ip_signature || !task.payment_signature) {
      throw new InternalServerErrorException('Transaction incomplete!');
    }
    const admin = await this.adminRepository.find();
    const newMessage: crypto.ServerReleaseSignatureMessage = {
      ipToUserId: task.poster.id,
      paymentToUserId: draft.author.id,
      taskId: task.id,
      createdOn: await this.getCurrDateTime(),
      status: 'RELEASED_IP_AND_PAYMENT',
    };
    const releaseMsg = JSON.stringify(newMessage);
    task.server_sig_message = releaseMsg;
    task.server_signature = crypto.createSignature(
      newMessage,
      admin[0].private_key,
    );
    await this.taskRepository.save([task]);
    return task;
  }
}
