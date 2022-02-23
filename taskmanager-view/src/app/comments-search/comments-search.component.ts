import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IComment } from '../comment';
import { TaskService } from '../task.service';
import { Comments } from '../mock-comments';

@Component({
  selector: 'app-comments-search',
  templateUrl: './comments-search.component.html',
  styleUrls: ['./comments-search.component.css','../css/styles.css']
})

// Component for the search comments by text
export class CommentsSearchComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router) { }

  searchText: any;
  comment_list: IComment[] = [];

  ngOnInit(): void {
  }

  // Executing the search
  search() {
    console.log('Start searching on: ', this.searchText);
    this.getCommentsByText(this.searchText);
    //this.getMockCommentsByText(this.searchText);
  }

  // Opening task by id in the task form component
  openTask(taskId: any) {
    console.log('Open task: ', taskId);
    this.router.navigateByUrl('/task-form/' + taskId);
  }

  // Getting comments from the database and searching by text
  getCommentsByText(searchText: any): void {
    console.log('Entering GetComments');
    this.comment_list = [];
    this.taskService.getComments().subscribe((comments) => {
      this.comment_list = comments.filter(c => c.commenttext.indexOf(searchText) != -1);
    });

  }

  // Getting comments from the mock data and searching by text
  getMockCommentsByText(searchText: any): void {
    console.log('Entering GetComments');
    this.comment_list = Comments;
    this.comment_list = this.comment_list.filter(c => c.commenttext.indexOf(searchText) != -1);
  }
}
