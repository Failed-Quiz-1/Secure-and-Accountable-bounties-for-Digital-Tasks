import { Controller, Get, Post} from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @Post()
  // create(){
  //   return this.adminService.createAdminKeys();
  // }

  @Get()
  findAll() {
    return this.adminService.findAdminKeys();
  }
}
