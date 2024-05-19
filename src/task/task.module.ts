import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task, TaskSchema } from './models/task';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    UsersModule
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
