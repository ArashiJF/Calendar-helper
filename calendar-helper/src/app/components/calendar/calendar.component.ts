import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  
  /*fullcalendar plugin array*/
  calendarPlugins = [dayGridPlugin];
  
  constructor() { 
  }

  ngOnInit() {
  }

}
