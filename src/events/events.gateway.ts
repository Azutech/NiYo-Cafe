import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {ServerToClientEvents} from '../events/interfaces/events.interface'

@WebSocketGateway({
  namespace: 'events',
  cors: {
    origin: '*',
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server<any, ServerToClientEvents>

  afterInit(client: Socket) {
    console.log('WebSocket initialized');
  }
  @SubscribeMessage('message')
  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  emitTaskCreated(newTask: any) {
    console.log(newTask)
    this.server.emit('taskCreated', newTask);
  }

  emitTaskUpdated(updatedTask: any) {
    this.server.emit('taskUpdated', updatedTask);
  }

  emitTaskDeleted(deletedTask: string) {
    this.server.emit('taskDeleted', deletedTask);
  }
}
