import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
  providers: [LoginService],
  exports: [HttpModule, LoginService], // Para que otros módulos puedan importar el servicio
})
export class loginModule {}
