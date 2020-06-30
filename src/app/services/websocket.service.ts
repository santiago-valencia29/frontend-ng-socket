import { Injectable, ɵConsole } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor(private socket: Socket) {
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Cliente conectado');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Cliente desconectado');
      this.socketStatus = false;
    });

  }

  // tslint:disable-next-line: ban-types
  emit(evento: string, payload?: any, callback?: Function) {
    // emit ('EVENTO', payload, callback?)
    console.log('Emitiendo Mensaje');
    this.socket.emit(evento, payload, callback);

  }

  listen(evento: string){
    return  this.socket.fromEvent(evento);
  }

}
