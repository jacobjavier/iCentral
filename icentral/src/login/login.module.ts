import { Module } from '@nestjs/common';
import { loginService } from './login.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
  providers: [loginService],
  exports: [HttpModule, loginService], // Para que otros módulos puedan importar el servicio
})
export class loginModule {}
