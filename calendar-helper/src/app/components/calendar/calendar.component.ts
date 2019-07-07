import { 
  Component, 
  OnInit, 
  ViewChild } 
from '@angular/core';

import { FullCalendarComponent } from '@fullcalendar/angular';

//calendar imports
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';

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
  @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;

  /*fullcalendar plugin array*/
  calendarPlugins = [
    dayGridPlugin,
    interactionPlugin
  ];
  
  /*fullcalendar event array*/
  calendarEvents: EventInput[] = [];

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

  handleDateClick(arg) 
  {
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        title: 'New Event',
        start: arg.date,
        allDay: arg.allDay
      })
    }
  }
}
