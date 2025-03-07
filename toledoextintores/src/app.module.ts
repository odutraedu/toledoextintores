import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExtintorModule } from './extintor/extintor.module';

@Module({
  imports: [ExtintorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
