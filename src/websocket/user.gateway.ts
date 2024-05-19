// task.gateway.ts
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TaskService } from '../task/task.service';
import { CreateTaskDto } from '../task/dto/create-task.dto';

@WebSocketGateway()
export class TaskGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly taskService: TaskService) {}

  // Listen for new tasks being created
  @SubscribeMessage('createTask')
  onMessage(@MessageBody() body: any) {
    console.log(body)
  }
  // async handleCreateTask(@MessageBody() createTaskDto: CreateTaskDto): Promise<void> {
  //   const task = await this.taskService.createTask(createTaskDto, createTaskDto.userId);
  //   this.server.emit('taskCreated', task);
  // }

  // Broadcast updated tasks
  broadcastTaskUpdate(task: any) {
    this.server.emit('taskUpdated', task);
  }

  // Broadcast removed tasks
  broadcastTaskRemove(taskId: string) {
    this.server.emit('taskRemoved', taskId);
  }
}

