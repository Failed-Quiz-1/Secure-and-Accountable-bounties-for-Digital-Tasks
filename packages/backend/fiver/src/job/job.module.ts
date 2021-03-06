import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Users } from 'src/users/entities/user.entity';
import { Task } from 'src/task/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Job,Users,Task]),
  ],
  controllers: [JobController],
  providers: [JobService]
})
export class JobModule {}
