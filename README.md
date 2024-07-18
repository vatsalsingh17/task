# TaskManager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Functionality

Task-list component-
    The `TaskListComponent` displays a list of tasks. Each task in the list shows the task name and a "Delete" and "view details" button. Clicking the "Delete" button for a task removes it from the list and deletes it from the task service. Clicking on "view details" button navigates to the `TaskDetailComponent`. Task prioritization is done (e.g., high, medium, low) and tasks displayed in different colors based on their priority. (in a sorted manner)

Task-detail Component-
    In `TaskDetailComponent`, you can view and edit the task details. The task details should include at least a title and description. The `TaskDetailComponent` have an "Edit" button that allows you to edit the task details. When edited, the changes should be saved using the `TaskService`.

Task-filter Component-
    Filter by priority and Search functionality to filter tasks by name or description.

Task service- 
    A service called `Task` is implemented to manage tasks. This service has methods for adding, deleting, updating, and retrieving tasks.

![image](https://github.com/pracheesingh03/myTaskManager/assets/55819473/c2318ee3-360f-4887-b19a-19bbdaa36954)
![image](https://github.com/pracheesingh03/myTaskManager/assets/55819473/0907ac0d-22b6-4756-b138-cf4f1b62f94c)
![image](https://github.com/pracheesingh03/myTaskManager/assets/55819473/b72a9bda-958a-4fbf-83d8-6b852ede708f)



 
