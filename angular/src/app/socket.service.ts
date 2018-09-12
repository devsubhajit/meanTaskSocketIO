import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';


@Injectable()
export class SocketService {
  constructor() { }
  private url = 'http://localhost:3000';
  private socket;
  
  addItem(item) {
    this.socket.emit('add-item', item);
  }

}
