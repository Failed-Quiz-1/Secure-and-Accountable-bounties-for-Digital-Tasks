import { Module } from '@nestjs/common';
import { DraftService } from './draft.service';
import { DraftController } from './draft.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Draft } from './entities/draft.entity';
import { Users } from 'src/users/entities/user.entity';
import { Task } from 'src/task/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Draft,Users,Task]),
  ],
  controllers: [DraftController],
  providers: [DraftService]
})
export class DraftModule {}
