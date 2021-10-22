import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DraftService } from './draft.service';
import { CreateDraftDto } from './dto/create-draft.dto';
import { RejectDraftDto } from './dto/update-draft.dto';

@Controller('draft')
export class DraftController {
  constructor(private readonly draftService: DraftService) {}

  @Post()
  create(@Body() createDraftDto: CreateDraftDto) {
    return this.draftService.create(createDraftDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() rejectDraftDto: RejectDraftDto) {
    return this.draftService.update(+id, rejectDraftDto);
  }

  @Get('/user/:id')
  findByUserId(@Param('id') id: string) {
    return this.draftService.findByUserId(+id);
  }

  @Get('/task/:id')
  findByTaskId(@Param('id') id: string) {
    return this.draftService.findByTaskId(+id);
  }
}
