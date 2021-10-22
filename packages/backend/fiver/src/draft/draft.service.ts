import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateDraftDto } from './dto/create-draft.dto';
import { RejectDraftDto } from './dto/update-draft.dto';
import { Draft } from './entities/draft.entity';

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
  
  async create(createDraftDto: CreateDraftDto) {
    try{
      const newDraft = new Draft();
      newDraft.draft_signature = createDraftDto.passphrase;
      const user = await this.usersRepository.findOne({id:createDraftDto.userid});
      const task = await this.taskRepository.findOne({id:createDraftDto.taskid});
      newDraft.author = user;
      newDraft.task = task;
      await this.draftRepository.save([newDraft]);
      return newDraft;
    }catch(e){
      return new InternalServerErrorException(e);
    }
  }

  async update(id: number, rejectDraftDto: RejectDraftDto) {
    try{
      const draft = await this.draftRepository.findOneOrFail({
        where: [{ id: id }],
        relations: ['author','task'],
      });
      draft.reject_signature = rejectDraftDto.passphrase;
      await this.draftRepository.save([draft]);
      return draft;
    }catch(e){
      return new NotFoundException("Draft not found");
    }
  }

  async findByTaskId(taskid: number){
    try{
      const task = await this.taskRepository.findOne({
        id:taskid
      });
      const allDrafts = await this.draftRepository.find({
        where: [{ task: task }],
        relations: ['author','task'],
      });
      return allDrafts;
    }catch(e){
      return new InternalServerErrorException(e);
    }
  }


  async findByUserId(userid: number){
    try{
      const user = await this.usersRepository.findOne({
        id:userid
      });
      const allDrafts = await this.draftRepository.find({
        where: [{ author: user }],
        relations: ['author','task'],
      });
      return allDrafts;
    }catch(e){
      return new InternalServerErrorException(e);
    }
  }
}
