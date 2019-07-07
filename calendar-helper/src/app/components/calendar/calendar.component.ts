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
  MatListModule,
  MatDialogModule, 
  MatDialog,
  MatDialogConfig,
  MatInputModule} 
from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

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

  constructor(private dialog: MatDialog) { 
  }

  ngOnInit() {
  }

  openDialog(arg) {
    const dialogConfig = new MatDialogConfig;

    //position of the dialog that will open
    dialogConfig.position = {'top': '0', 'left': '0', 'right': '0'};

    //dont let user click outside dialog to close
    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    //open dialog calling the dialog component and receive the save data (if any)
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.calendarEvents = this.calendarEvents.concat({
          title: data.title,
          start: arg.date,
          allDay: arg.allDay,
          hour: data.hour,
          city: data.city
        });
        console.log(this.calendarEvents);
      }
    );

  }

  modifyTitle(eventIndex, newTitle) {
    let copyCalendarEvents = this.calendarEvents.slice(); //clone the current array
    let singleEvent = Object.assign({}, copyCalendarEvents[eventIndex]); //take the entry we want to edit
    
    singleEvent.title = newTitle; //we edit the entry
    copyCalendarEvents[eventIndex] = singleEvent; //we add said entry where it belongs in the copy calendar array
    
    this.calendarEvents = copyCalendarEvents;
  }

  /*
  handleDateClick(arg) 
  {
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        title: 'New Event',
        start: arg.date,
        allDay: arg.allDay
      })
    }
    console.log(this.calendarEvents);
  } */ 
}
