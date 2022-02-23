import { NgModule } from '@angular/core';
import { CommentsSearchComponent } from './comments-search/comments-search.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'tasks', component: TasksComponent},
  { path: 'comment-search', component: CommentsSearchComponent },
  { path: 'task-form/:id', component: TaskFormComponent },  
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

