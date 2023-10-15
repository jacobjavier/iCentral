import { Controller, Get } from '@nestjs/common';
import axios from 'axios';

@Controller('login')
export class LoginController {
    @Get('login')
    async login() {
      const data = {
        username: 'client',
        password: 'pa$$word',
        expiration: 604800,
        sliding: 1,
        deviceName: 'My Phone Model',
      };
  
      try {
        const response = await axios.post('https://portal.icentral.com.mx/crm/api/v1.0/client-zone/login', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        console.log('Status:', response.status);
        console.log('Headers:', response.headers);
        console.log('Response:', response.data);
  
        return response.data; // Optionally return the response data to the client
      } catch (error) {
        // Handle error
        console.error('Error:', error);
        throw error;
      }
    }
  
}
