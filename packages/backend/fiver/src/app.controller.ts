import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { Multer } from 'multer';
const crypto = require('crypto');
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Multer.File) {
    const fileBuffer = fs.readFileSync("./upload/" + file.filename);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    const hex = hashSum.digest('hex');
    console.log("VAL IS " + hex);
    const fileVal = {
      filename: file.filename,
      hash: hex,
    }
    return fileVal;
    //return {
    //  filePath: `/upload/${file.filename}`,
    //};
  }

  @Get('upload/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'upload' });
  }
}
