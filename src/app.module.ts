import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExtintorModule } from './extintor/extintor.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ExtintorModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
