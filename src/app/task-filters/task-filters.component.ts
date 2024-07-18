import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../task.module';
import { TaskService } from '../task.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-task-filters',
  templateUrl: './task-filters.component.html',
  styleUrls: ['./task-filters.component.scss']
})
export class TaskFiltersComponent {
  selectedOption: string = '';
  priorityFilter: string = 'none';

  tasks$: Observable<Task[]>;
  filteredTasks$: Observable<Task[]>; 
  filteredSearch$: Observable<Task[]>; 
  //filteredSearchID$: Observable<Task[]>; 
  

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) {
    this.tasks$ = new Observable<Task[]>();
    this.filteredTasks$ = new Observable<Task[]>();
    this.filteredSearch$ = new Observable<Task[]>();
    //this.filteredSearchID$ = new Observable<Task[]>();
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

  sortTasksByPriority(): void {
    const priorityOrder: { [key: string]: number } = { 'table-danger': 3, 'table-warning': 2, 'table-success': 1, '': 0 };
    this.tasks$ = this.tasks$.pipe(
      map(tasks => {
        return tasks.sort((a, b) => {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
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

  value: string='';

  Searchtask(): void {
    const searchTerm = this.value.toString().toLowerCase();
    
    this.filteredSearch$ = this.tasks$.pipe(
      map(tasks => tasks.filter(task => {
        const taskid= task.id.toString();
        const idContains = taskid.includes(searchTerm);
        const titleContains = task.title.toLowerCase().includes(searchTerm);
        const descriptionContains = task.description.toLowerCase().includes(searchTerm);
        return titleContains || descriptionContains ||idContains;
      }))
    );
  }

  filterTasksByPriority(priority: string): void {
    this.priorityFilter = priority;
    localStorage.setItem('priorityFilter', priority); 
    this.filteredTasks$ = this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.priority === priority ))
    );
    this.priorityFilter='';
  }
}
