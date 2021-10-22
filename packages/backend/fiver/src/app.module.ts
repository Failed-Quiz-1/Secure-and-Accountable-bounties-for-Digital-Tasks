import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DraftModule } from './draft/draft.module';
import { TaskModule } from './task/task.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entities/user.entity';
import { Task } from './task/entities/task.entity';
import { Draft } from './draft/entities/draft.entity';
import { Admin } from './admin/entities/admin.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Users,Task,Draft,Admin]),
    TypeOrmModule.forRoot(),UsersModule, DraftModule, TaskModule, AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
