import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Users } from 'src/users/entities/user.entity';
import { Draft } from 'src/draft/entities/draft.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task,Users, Draft]),
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
