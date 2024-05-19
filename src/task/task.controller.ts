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
  UseGuards
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/jwt/jwt.auth';


@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post('addTask')
  async create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
    const user = req.user;
    return this.taskService.createTask(createTaskDto, user._id);
  }

  @Get('/all')
  async findAll() {
    return this.taskService.findAll();
  }

  @Get('userTasks')
  async getTasksForUser(@Req() req) {
    const user = req.user; // Assuming user is attached to the request object by the AuthGuard
    return this.taskService.getTasksForUser(user._id);
  }

  @Get('getTask')
  findOne(@Query('id') id: string) {
    return this.taskService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch('updateTask')
  async update(@Query('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('deleteTask')
  async remove(@Query('id') id: string) {
    return this.taskService.remove(id);
  }
}
