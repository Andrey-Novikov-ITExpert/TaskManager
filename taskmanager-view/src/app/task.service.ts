import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { Subject, Observable, of } from 'rxjs';
import { ITask } from './task';
import { Tasks } from './mock-tasks';
import { IComment } from './comment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})


export class TaskService {
  
  // Using Subject to handle data updates
  private subjectNotifier = new Subject<any>();

  constructor(private http: HttpClient,
    private messageService: MessageService) { }
  
  // Getting all tasks from the Database
  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(environment.tasksAPIUrl)
  }
  
  // Getting all tasks from mock data
  getMockTasks(): Observable<ITask[]> {
    return of(Tasks);
  }

  // Getting all comments from the Database
  getComments(): Observable<IComment[]> {
    return this.http.get<IComment[]>(environment.commentsAPIUrl)
  }

  // Adding new comment to the the Database
  addComment(commentText: any, Task?: ITask): void {

    // Setting Http headers
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    // Formatting current date
    let nowDate = formatDate(Date.now(), 'yyyy-MM-dd', 'en_US');

    // Initializing new comment data
    let newComment: IComment = { commentid: 0, dateadded: nowDate, commenttext: commentText, commenttype: 'Initial', reminderdate: nowDate, taskid: Task?.taskId ?? 0 }
    
    console.log('Adding comment with data: ', JSON.stringify(newComment));

    // API POST request
    this.http.post<any>(environment.commentsAPIUrl, JSON.stringify(newComment), httpOptions).subscribe({
      next: data => {
        // Success handler
        console.log('Success:', data);                
        this.sendUpdate("comments updated");
        
      },
      error: error => {
        // Error hanler
        console.error('There was an error!', error);
      }
    });


  }
  
  // Deleting comment from the the Database
  deleteComment(id: any): void {

    // Setting delete API Url
    let deleteUrl = environment.commentsAPIUrl + "/" + id;

    // API Delete request
    this.http.delete(deleteUrl)
      .subscribe({
        next: data => {

          // Success handler
          console.log('Deletion successful:', data);
          this.sendUpdate("Comments deleted");
        },
        error: error => {
          // Error hanler
          console.error('There was an error!', error);
        }
      });
  }

  // Getting update subscription notification
  getUpdate(): Observable<any> { 
    return this.subjectNotifier.asObservable(); 
  }

  // Sending update subscription notification
  sendUpdate(message: string) { 
    this.subjectNotifier.next({ text: message }); 
  }

  // Formatting date string received from the Database
  formatDBDate(inputString: string): string{
    let outputString = '';
    if(inputString.indexOf("T") != -1)
    {
       outputString = inputString.split('T')[0];
    }

    return outputString;
  }

  // Formatting date string received from the Database
  formatDBString(inputString: string): string{
    let outputString = '';
    if(inputString.indexOf("{") != -1)
    {
       outputString = inputString.replace('{"','').replace('"}','').trim();
    }

    return outputString;
  }
}
