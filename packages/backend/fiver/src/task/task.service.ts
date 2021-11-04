import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApproveTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import * as crypto from 'crypto-helper';
import { Draft } from 'src/draft/entities/draft.entity';
@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Draft)
    private draftRepository: Repository<Draft>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const newTask = new Task();
      newTask.name = createTaskDto.taskname;
      newTask.description = createTaskDto.description;
      newTask.status = "POSTED";
      const user = await this.usersRepository.findOneOrFail({
        id: createTaskDto.userid,
      });
      newTask.poster = user;
      await this.taskRepository.save([newTask]);
      return newTask;
    } catch (error) {
        return new BadRequestException( error);
      
    }
  }

  async findAll() {
    const allTasks = await this.taskRepository.find({
      relations: ['poster'],
    });
    return allTasks;
  }

  async findOne(id: number) {
    try{
      const task = await this.taskRepository.findOneOrFail({
        where: [{ id: id }],
        relations: ['poster'],
      })
      return task;
    }catch(e){
      return new NotFoundException("Task not found")
    }
  }

  async approve(id: number, approveTaskDto: ApproveTaskDto) {
      const task = await this.taskRepository.findOne({
        where: [{ id: id }],
        relations: ['poster'],
      });
      if (!task)
      throw new NotFoundException("Task not found!");
      const draft = await this.draftRepository.findOneOrFail({
        where: [{ id: approveTaskDto.approved_draftid }],
        relations: ['author','task'],
      });
      task.status = "APPROVED";
      //task.payment_signature = approveTaskDto.passphrase;
      task.approval_draft_id = approveTaskDto.approved_draftid;
      const ppk = crypto.generatePublicAndPrivateKey(approveTaskDto.mnemonic);
      await this.taskRepository.save([task]);
      return task;
      return new NotFoundException("Task not found");
  }

  async releaseIP (id, approveTaskDto:ApproveTaskDto){
    try{
      const task = await this.taskRepository.findOneOrFail({
        where: [{ id: id }],
        relations: ['poster'],
      });
      task.status = "COMPLETED";
      task.ip_signature = approveTaskDto.passphrase;
      await this.taskRepository.save([task]);
      return task;
    }catch(e){
      return new NotFoundException("Task not found");
    }
  }
}
