import { Controller, Get } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  async login() {
    try {
      const response = await this.loginService.apiFindAll();

      if (response && response.data) {
        console.log('Status:', response.status);
        console.log('Headers:', response.headers);
        console.log('Response:', response.data);

        return response.data;
      } else {
        // El objeto response o su propiedad 'data' es undefined
        console.error('Response is undefined or has no data');
        // Puedes manejar el error de otra manera, como lanzar una excepción.
        throw new Error('Response is undefined or has no data');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}