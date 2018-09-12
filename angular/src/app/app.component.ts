import { Component } from '@angular/core';
import { TasksService } from './services/tasks.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  socket;
  constructor(){
    this.socket = io();
  }
  title = 'My Task List';
}
