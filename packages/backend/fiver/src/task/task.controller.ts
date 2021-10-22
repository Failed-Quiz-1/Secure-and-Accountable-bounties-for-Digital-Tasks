import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApproveTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch('/approval/:id')
  update(@Param('id') id: string, @Body() updateTaskDto: ApproveTaskDto) {
    return this.taskService.approve(+id, updateTaskDto);
  }

  @Patch('/release_ip/:id')
  releaseIP(@Param('id') id: string, @Body() updateTaskDto: ApproveTaskDto) {
    return this.taskService.releaseIP(+id, updateTaskDto);
  }
}
