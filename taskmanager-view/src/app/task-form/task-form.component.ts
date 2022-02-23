import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITask } from '../task';
import { IComment } from '../comment';
import { TaskService } from '../task.service';
import { Tasks } from '../mock-tasks';
import { Comments } from '../mock-comments';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css', '../css/styles.css']
})

// Component for the showing task details and corresponding comments
export class TaskFormComponent implements OnInit {

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }
  private routeSub: Subscription = new Subscription();
  
  CurrentTaskId: any;
  Task?: ITask;
  task_list: ITask[] = [];
  comment_list: IComment[] = Comments;

  // Component init
  ngOnInit(): void {
    // Getting query string parameter
    this.routeSub = this.route.params.subscribe(params => {
      console.log('taskId is: ', params['id']);
      this.CurrentTaskId = params['id'];
      // Loading data
      this.getCurrentTask();
      this.getFilteredComments();
    });
  }

  // Getting comments list filtered by current task
  getFilteredComments(): void {
    console.log('Entering GetComments');
    this.comment_list = [];
    this.taskService.getComments().subscribe((comments) => {
      this.comment_list = comments.filter(c => c.taskid == this.CurrentTaskId);
      console.log('GetComments done');
    });
  }

  // Getting the current task from the tasks list
  getCurrentTask(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.task_list = tasks.filter(task => task.taskId == this.CurrentTaskId);
      this.Task = this.task_list[0];
      console.log('Current task is:', this.Task);
    });
  }

  // Getting the current task from the mock data
  getMockTasks(): void {
    this.taskService.getMockTasks().subscribe((tasks: ITask[]) => {
      this.task_list = tasks.filter(task => task.taskId == this.CurrentTaskId);
      this.Task = this.task_list[0];
      console.log('Current task is:', this.Task);
    });
  }

  // Getting comments list filtered by current task from the mock data
  getMockComments(): void {
    this.comment_list = Comments.filter(c => c.taskid == this.CurrentTaskId);
    console.log('Task id is: ', this.Task?.taskId);
    console.log('Comments filtered: ', this.comment_list);
  }
}
