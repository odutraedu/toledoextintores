import { Module } from '@nestjs/common';
import { ExtintorService } from './extintor.service';
import { ExtintorController } from './extintor.controller';

@Module({
  controllers: [ExtintorController],
  providers: [ExtintorService],
})
export class ExtintorModule {}
