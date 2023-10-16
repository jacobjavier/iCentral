import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class loginService {
  constructor(private httpService: HttpService) {}

  async generateToken() {
    const data = {
      username: 'noc@icentral.net',
      password: 'iCentral2020',
      expiration: 604800,
      sliding: 1,
      deviceName: 'My Phone Model',
    };

    try {
      const response = await this.httpService.post('https://portal.icentral.com.mx/crm/api/v1.0/client-zone/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).toPromise();

      return response.data.token; // Asumiendo que el token se encuentra en la respuesta
    } catch (error) {
      throw new Error('No se pudo generar el token.');
    }
  }
}
