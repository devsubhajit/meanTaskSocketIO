import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { contentHeaders } from '../headers';




@Injectable()
export class TasksService {
  constructor(private http: Http) {
    console.log('Task service Initialized');
  }
  getTasks() {
    //var headers = new Headers();
    // return this.http.get('https://subhatask.herokuapp.com/api/tasks',  { headers: contentHeaders })
    return this.http.get('/api/tasks', { headers: contentHeaders })
      .map(res =>
        res.json()
      );
  }

  addTask(newTask) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/task', JSON.stringify(newTask), { headers: headers }) // api/task
      .map(res => res.json());
  }
  getMessages() {
  
  }
  deleteTask(id) {
    return this.http.delete('/api/task/' + id)
      .map(res => res.json());
  }
  updateStatus(task) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/api/task/' + task._id, JSON.stringify(task), { headers: headers })
      .map(res => res.json());
  }

}
