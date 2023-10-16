import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LoginService {
  constructor(private readonly loginService: HttpService) {}

  public async apiFindAll() {
    const data = {
      username: 'noc@icentral.net',
      password: 'iCentral2020',
      expiration: 604800,
      sliding: 1,
      deviceName: 'My Phone Model',
    };

    try {
      const response = await firstValueFrom(
        this.loginService.post('https://portal.icentral.com.mx/crm/api/v1.0/client-zone/login', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      );

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}

