import { Controller, Get } from '@nestjs/common';
import { loginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: loginService) {}

  @Get('generate-token')
  async generateToken() {
    const token = await this.loginService.generateToken();
    return { token };
  }
}
