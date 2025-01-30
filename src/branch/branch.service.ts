import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from './entities/branch.entity';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch) private branchRepository: Repository<Branch>
  ) { }

  async create(name: string) {
    const branchFound = await this.branchRepository.findOne({ where: { name } });
    if (branchFound) throw new ConflictException("Ya existe una sucursal con el nombre ingresado.");

    const branch = this.branchRepository.create({name});
    return this.branchRepository.save(branch);
  }

  findAll() {
    return this.branchRepository.find();
  }
}
