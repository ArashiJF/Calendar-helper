import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*component imports*/
import { CalendarComponent } from './components/calendar/calendar.component';

const routes: Routes = 
[
  {
    path: '',
    redirectTo: 'calendar',
    pathMatch: 'full'
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    data: {title: 'Month reminders'}
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
