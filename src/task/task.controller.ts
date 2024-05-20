import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/jwt/jwt.auth';
import { EventsGateway } from 'src/events/events.gateway';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('addTask')
  async create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
    const user = req.user;
    const data =  await this.taskService.createTask(createTaskDto, user._id);

    // Send events via web sockets
    this.eventsGateway.emitTaskCreated(data)

    return data
     
  }

  @Get('/all')
  async findAll() {
    return this.taskService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('userTasks')
  async getTasksForUser(@Req() req) {
    const user = req.user; // Assuming user is attached to the request object by the AuthGuard
    return this.taskService.getTasksForUser(user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getTask')
  async findOne(@Query('id') id: string) {
    return this.taskService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('updateTask')
  async update(@Query('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deleteTask')
  async remove(@Query('id') id: string) {
    return this.taskService.remove(id);
  }
}
