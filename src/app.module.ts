import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { GatewayModule } from './websocket/gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Import ConfigModule with default options
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to use ConfigService
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), // Get MongoDB URI from environment variables
      }),
      inject: [ConfigService], // Inject ConfigService into the factory function
    }),
    UsersModule,
    AuthModule,
    TaskModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
