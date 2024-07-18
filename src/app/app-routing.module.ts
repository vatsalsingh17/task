import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFiltersComponent } from './task-filters/task-filters.component';
 
const routes: Routes = [
  { path: 'tasks', component: TaskListComponent },
  { path: 'task/:id', component: TaskDetailComponent }, 
  { path: 'filters', component: TaskFiltersComponent},
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }, //URL path is empty (i.e., the root path)
  { path: '**', redirectTo: '/tasks' } //wildcard that matches any URL that hasn't been matched by previous routes.
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 