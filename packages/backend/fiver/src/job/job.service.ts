import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    return savedJob;
  }

  async findAll() {
    const allJob = await this.jobRepository.find({
      relations: ['poster'],
    });
    return allJob;
  }

  async findOne(id: number) {
    const job = await this.jobRepository.findOneOrFail({
      where: [{ id: id }],
      relations: ['poster'],
    });
    return job;
  }

}
