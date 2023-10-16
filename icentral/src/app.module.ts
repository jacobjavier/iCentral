import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './login/login.controller';
import { loginService } from './login/login.service';
import { loginModule } from './login/login.module';

@Module({
  imports: [loginModule],
  controllers: [AppController, LoginController],
  providers: [AppService, loginService],
})
export class AppModule {}
