import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExtintorModule } from './extintor/extintor.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [ExtintorModule, AuthModule, UserModule],
  controllers: [AppController,  ],
  providers: [AppService],
})
export class AppModule {}
