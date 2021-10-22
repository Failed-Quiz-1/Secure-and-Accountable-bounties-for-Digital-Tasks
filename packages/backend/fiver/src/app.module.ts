import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DraftModule } from './draft/draft.module';
import { TaskModule } from './task/task.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [UsersModule, DraftModule, TaskModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
