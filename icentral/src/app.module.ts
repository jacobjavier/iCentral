/* import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './login/login.controller';
import { loginService } from './login/login.service';
import { loginModule } from './login/login.module';
import { CORS } from './Constants';
import { CorsModule } from '@nestjs/platform-express';

@Module({
  imports: [loginModule, CorsModule.forRoot({
    origin: '*', // Opciones de CORS
  }), ],
  controllers: [AppController, LoginController],
  providers: [AppService, loginService],
})
export class AppModule {}
 */

import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { loginModule } from './login/login.module';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';

const express = require('express');

@Module({
  imports: [loginModule],
  controllers: [AppController, LoginController, ],
  providers: [AppService, LoginService, ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Habilita CORS para todas las rutas y métodos (puedes personalizar las opciones según tus necesidades)
    const app = express();
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      next();
    });

    consumer.apply(app).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
