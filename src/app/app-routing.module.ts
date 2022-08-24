import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoListComponent } from './to-do-list/to-do-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/to-do', pathMatch: 'full' },
  { path: 'to-do', component: ToDoListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
