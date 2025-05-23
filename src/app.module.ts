import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExtintorModule } from './extintor/extintor.module';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ExtintorModule, AuthModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
