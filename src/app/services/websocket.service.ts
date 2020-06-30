import { Injectable, ɵConsole } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario = null;

  constructor(private socket: Socket) {
    this.cargarStorage();
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

  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  loginWS(nombre: string) {
    // console.log('Configurando', nombre);
    // this.socket.emit('configurar-usuario', { nombre }, (resp) => {
    //   console.log(resp);
    // });

    return new Promise((resolve, reject) => {
      this.emit('configurar-usuario', { nombre }, resp => {
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve();
        console.log(resp);
      });
    });
  }

  getUsuario(){
    return this.usuario;
  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }
  }

}
