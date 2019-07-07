import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';

//material imports
import { 
  MatButtonModule, 
  MatCardModule, 
  MatMenuModule, 
  MatToolbarModule,
  MatIconModule, 
  MatSidenavModule, 
  MatListModule } 
from '@angular/material';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  
  /*fullcalendar plugin array*/
  calendarPlugins = [dayGridPlugin];
  
  /*fullcalendar event array*/
  calendarEvents = [{title: 'event 1', date: '2019-07-01'}];

  constructor() { 
  }

  ngOnInit() {
  }

  addEvent() {
    /* taken from documentation 
    *By default, FullCalendar will only know to rerender when a property’s reference has changed. 
    So, for adding an item to an array or modifying a property of an object, 
    you need to create a new object instead of using the old one
    *
    */
    this.calendarEvents = this.calendarEvents.concat({title: 'event 2', date: '2019-07-02'});
  }

  modifyTitle(eventIndex, newTitle) {
    let copyCalendarEvents = this.calendarEvents.slice(); //clone the current array
    let singleEvent = Object.assign({}, copyCalendarEvents[eventIndex]); //take the entry we want to edit
    
    singleEvent.title = newTitle; //we edit the entry
    copyCalendarEvents[eventIndex] = singleEvent; //we add said entry where it belongs in the copy calendar array
    
    this.calendarEvents = copyCalendarEvents;
  }
}
