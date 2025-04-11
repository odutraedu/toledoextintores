import { Module } from '@nestjs/common';
import { ExtintorService } from './extintor.service';
import { ExtintorController } from './extintor.controller';
import { PrismaService } from 'prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';



@Module({
  controllers: [ExtintorController],
  providers: [ExtintorService, PrismaService, AuthService],
})
export class ExtintorModule {}
