import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../task.module';
import { TaskService } from '../task.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  selectedOption: string = '';
  priorityFilter: string = '';

  tasks$: Observable<Task[]>;
  filteredTasks$: Observable<Task[]>; 
  filteredSearch$: Observable<Task[]>; 
  
  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) {
    this.tasks$ = new Observable<Task[]>();
    this.filteredTasks$ = new Observable<Task[]>();
    this.filteredSearch$ = new Observable<Task[]>();
  }

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks();

    const storedPriorityFilter = localStorage.getItem('priorityFilter');
    if (storedPriorityFilter) {
      this.priorityFilter = storedPriorityFilter;
      this.filterTasksByPriority(this.priorityFilter);
    } 
    else {
      this.filteredTasks$ = this.tasks$;
    }
  }
  ID:number=1;
  createtask(title: string, details: string): void {
    const newTask: Task = {
      // id: Math.floor(Math.random() * 1000),
      id: this.ID++,
      title: title,
      description: details,
      priority: this.selectedOption
    };

    this.taskService.addtask(newTask);
    this.selectedOption = ''; //resets task priority dropdown
    this.sortTasksByPriority();

    if (this.priorityFilter) {
      this.filterTasksByPriority(this.priorityFilter);
    }
  }

  sortTasksByPriority(): void {
    const priorityOrder: { [key: string]: number } = { 'table-danger': 3, 'table-warning': 2, 'table-success': 1, '': 0 };
    this.tasks$ = this.tasks$.pipe(
      map(tasks => {
        return tasks.sort((a, b) => {
          const priorityComparison = priorityOrder[b.priority] - priorityOrder[a.priority];
          if (priorityComparison !== 0) {
            return priorityComparison; 
          } else {
            return a.id - b.id;
          }
        });
      })
    );
  }

  delete(id: number): void {
    this.taskService.deletetask(id);
    if (this.priorityFilter) {
      this.filterTasksByPriority(this.priorityFilter);
    }
  }

  goTodetail(id: number): void {
    this.router.navigate(['/task', id]);
  }
  
  filterTasksByPriority(priority: string): void {
    this.priorityFilter = priority;
    localStorage.setItem('priorityFilter', priority); 
    this.filteredTasks$ = this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.priority === priority))
    );
  }

  // Searchtask(value: string): void {
  //   const id = Number(value);
  //   this.taskService.retrievetask(id);
  // }

  // Searchtask2(value: string): void {
  //   const searchTerm = value.toLowerCase();
    
  //   this.filteredSearch$ = this.tasks$.pipe(
  //     map(tasks => tasks.filter(task => {
  //       const titleContains = task.title.toLowerCase().includes(searchTerm);
  //       const descriptionContains = task.description.toLowerCase().includes(searchTerm);
  //       return titleContains || descriptionContains;
  //     }))
  //   );
  // }

}





