import { Component, OnInit } from '@angular/core';
import { ITask } from '../task';
import { Observable, of } from 'rxjs';
import { Tasks } from '../mock-tasks';
import { TaskService } from '../task.service';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],

})

// Component for the showing the all tasks in the Datatables grid and show comments for the selected task
export class TasksComponent implements OnInit {

  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  changingValue: Subject<boolean> = new Subject();

  constructor(public taskService: TaskService) { }

  task_list: ITask[] = [];

  // Getting tasks from Database
  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.task_list = tasks;
      // Initialization Datatables component
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true
      };
    });
  }

  // Getting tasks from mock data
  getMockTasks(): void {
    this.taskService.getMockTasks().subscribe((response: any) => {
      this.task_list = response;

      // Initialization Datatables component
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true
      };
    });
  }


  // Component init
  ngOnInit(): void {
    //this.getMockTasks();
    this.getTasks();
  }

  // Select task in Datatable event
  selectedTask?: ITask;
  onSelect(task: ITask): void {
    this.selectedTask = task;
    this.changingValue.next(true);
  }
}
