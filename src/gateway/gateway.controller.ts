import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway(5050)
export class GatewayController {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('message')
  onMessage(@MessageBody() message: string): void {
    this.server.emit('onMessage', message)
  }
}
