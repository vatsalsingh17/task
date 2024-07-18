import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../task.module';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task: Task | undefined;
  constructor(private route: ActivatedRoute, private taskservice: TaskService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.taskservice.getTasks().subscribe((tasks: Task[]) => {
        this.task = tasks.find((task: Task) => task.id === +id);
        //The +id is used to convert the id from a string to a number for comparison.
      });
    }
  }

  flag: boolean = false; //edit mode disabled
  editdetails(update: Task, updatedetails: string): void {
    this.flag = false;
    this.taskservice.updateTask(update, updatedetails);
  }

  edit(): void {
    this.flag = true;
  }
}
