
import { Injectable } from '@nestjs/common';
import { Cat } from './cat.entity';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  findAll(): Cat[] {
    return this.cats;
  }
}