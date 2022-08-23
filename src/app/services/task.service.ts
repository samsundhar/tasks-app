import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  // rootURL = 'localhost:3080/api';
  rootURL = '/api';

  test() {
    return this.http.get(this.rootURL);
  }

  getTasks() {
    return this.http.get(this.rootURL + '/tasks');
  }

  addTask(task: any) {
    console.log("on add task")
    return this.http.post(this.rootURL + '/task', { task });
  }

}
