import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../Task';

// import { Subject } from 'rxjs/Subject';
// import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  socket;
  tasks = [Task];
  public mytask = [];
  title: string;
  constructor(private taskService: TasksService) {
    this.taskService.getTasks()
      .subscribe(tasks => {
        console.log(tasks);
        this.tasks = tasks;
      });
    this.socket = io();
    this.socket.on('newtask', () => {
      this.taskService.getTasks()
        .subscribe(tasks => {
          console.log(tasks);
          this.tasks = tasks;
        });
    });
  }

  addTask(event) {

    event.preventDefault();
    var newTask = {
      title: this.title,
      isDone: false
    }

    this.taskService.addTask(newTask)
      .subscribe(task => {
        this.tasks.push(task);
        this.title = '';
      });
    this.socket.emit('addTask', newTask);

  }


  deleteTask(id) {
    var tasks = this.tasks;
    this.taskService.deleteTask(id).subscribe(data => {
      if (data.n == 1) {
        for (var i = 0; i < tasks.length; i++) {
          if (tasks[i]._id == id) {
            tasks.splice(i, 1);
          }
        }
      }
    });
  }
  updateStatus(task) {
    var _task = {
      _id: task._id,
      title: task.title,
      isDone: !task.isDone
    }
    this.taskService.updateStatus(_task).subscribe(data => {
      task.isDone = !task.isDone;
    });
  }

  ngOnInit() {
  }

}
