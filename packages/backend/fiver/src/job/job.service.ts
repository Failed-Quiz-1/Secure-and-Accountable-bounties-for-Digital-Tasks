import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  async create(createJobDto: CreateJobDto) {
    const newJob = new Job();
    const user = await this.usersRepository.findOne({
      id: createJobDto.userid,
    });
    newJob.name = createJobDto.jobname;
    newJob.description = createJobDto.description;
    newJob.poster = user;
    const savedJob = await this.jobRepository.save([newJob]);
    savedJob[0]['price'] = 0;
    return savedJob;
  }

  async findAll() {
    const allJob = await this.jobRepository.find({
      relations: ['poster'],
    });
    let i;
    console.log(allJob);
    for (i = 0; i < allJob.length; i++) {
      let jobPx = 0;
      const allTask = await this.taskRepository.find({
        where: [{ job: allJob[i] }],
      });
      if (allTask.length){
        for (let j = 0; j < allTask.length; j++) {
          jobPx = jobPx + allTask[j].price;
        }
      }
        allJob[i]['price'] = jobPx;
    }
    return allJob;
  }

  async findOne(id: number) {
    const job = await this.jobRepository.findOneOrFail({
      where: [{ id: id }],
      relations: ['poster'],
    });
    let jobPx = 0;
    const allTasks = await this.taskRepository.find({
      where: [{ jobid: job.id }],
    });
    if (allTasks.length){
      for (let j = 0; j < allTasks.length; j++) {
      jobPx = jobPx + allTasks[j].price;
    }
  }
    job['price'] = jobPx;
    return job;
  }
}
