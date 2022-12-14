import WebSocket, { WebSocketServer } from 'ws';
import { socket } from '../config.json';
import * as instagramController from './instagramController';

export const sockets: WebSocket[] = [];

export const wss = new WebSocketServer(socket);

const methods: any = {
  "instagram/account/add": instagramController.addAccount,
}

export async function init() {

  wss.on('connection', function connection(ws) {
    sockets.push(ws);

    ws.on('message', (data: string) => {
      const parsed = JSON.parse(data);
      methods[parsed.method](parsed.data);
    });
  });

  wss.on('close', function connection(ws: WebSocket) {
    sockets.push(ws);
  });

}
