import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from './task.module';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
//The @Injectable decorator marks the class TaskService as a service 
//that can be injected into other components or services.

export class TaskService {
  key: string = "task";

  private taskarray: Task[] = [];
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.taskarray);

  constructor(private router: Router) { }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }
  addtask(task: Task): void {
    this.taskarray.push(task);
    this.setlist(this.key, this.taskarray);
    this.tasksSubject.next([...this.taskarray]);
  }
  deletetask(id: number): void {
    this.taskarray = this.taskarray.filter(task => task.id !== id);
    this.setlist(this.key, this.taskarray);
    this.tasksSubject.next([...this.taskarray]);
  }
  updateTask(updatedTask: Task, details: string): void {
    const index = this.taskarray.findIndex(task => task.id === updatedTask.id);
    this.setlist(this.key, this.taskarray);
    if (index !== -1) {
      this.taskarray[index].description = details;
      this.tasksSubject.next([...this.taskarray]);
    }
  }
  retrievetask(id: number) {
    const index = this.taskarray.findIndex(task => task.id === id);
    if (index !== -1) {
      this.router.navigate(['/task', id]);
    } else {
      alert('Task not found');
    }
  }


  getlist(key: string) {
    let list = JSON.parse(localStorage.getItem(key) || '[]');
    return list;
  }
  setlist(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

}

