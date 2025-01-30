import { Controller, Get, Post, Body } from '@nestjs/common';
import { BranchService } from './branch.service';

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  create(@Body() name: string) {
    return this.branchService.create(name);
  }

  @Get()
  findAll() {
    return this.branchService.findAll();
  }
}
