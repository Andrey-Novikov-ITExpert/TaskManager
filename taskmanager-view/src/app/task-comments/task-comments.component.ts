import { Component, OnInit, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { ITask } from '../task';
import { IComment } from '../comment';
import { Comments } from '../mock-comments';
import { TaskService } from '../task.service';
import { BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-task-comments',
  templateUrl: './task-comments.component.html',
  styleUrls: ['./task-comments.component.css']
})

// Component for the showing comments for the selected task
export class TaskCommentsComponent implements OnInit {

  newComment: any;
  userComment: any;
  
  @Input() Task?: ITask;

  comment_list: IComment[] = [];

  // Subscription to handle data updates
  private updateSubscription: Subscription;

  constructor(private taskService: TaskService) {
     this.updateSubscription= this.taskService.getUpdate().subscribe
             (message => { 
                console.log('Message from subscription: ', message);
                this.getFilteredComments();
             }); 
   }

   // Handle change selected task
   ngOnChanges(changes: SimpleChanges) {    
    //this.getMockComments(); 
    this.getFilteredComments();    
  }


  // Getting commments filtered by task id
  getFilteredComments(taskId?: any): void {
    console.log('Entering GetComments');
    this.taskService.getComments().subscribe((comments) => {
        this.comment_list = comments.filter(c => c.taskid == this.Task?.taskId ?? taskId);

    });
  }
  
  // Getting commments filtered by task id from the mock data
  getMockComments(): void {
    this.comment_list = Comments.filter(c => c.taskid == this.Task?.taskId);
  }

  // Component init
  ngOnInit(): void {
    this.getFilteredComments();
    }

  // Component destructor  
  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

  // Add new comment
  addComment(commenText: any): void {
    this.taskService.addComment(commenText, this.Task);
  }

  // Delete comment
  deleteComment(id: any): void {
    this.taskService.deleteComment(id);
    this.getFilteredComments();
  }

}
