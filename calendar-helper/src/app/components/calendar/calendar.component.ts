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

//moment module for dates
import * as moment from 'moment';

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

  /*We will create a simple id for the events*/
  _id: number = -1;

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
        if (data) {
          this._id++
          let hourMinutes = data.hour.split(":");

          //we add the hour and minutes to the date registered
          let aStart = moment(arg.date).add(hourMinutes[0], 'hours').add(hourMinutes[1],'minutes').format();
          let anEnd = moment(arg.date).add(hourMinutes[0], 'hours').add(hourMinutes[1]+1,'minutes').format();
          //we need to add the new event into the array and as such we concatenate it
          //we will also add the id to the event
          this.calendarEvents = this.calendarEvents.concat({
            id: this._id,
            title: data.title,
            start: aStart,
            end: anEnd,
            hour: data.hour,
            city: data.city
          });
        }
        console.log(this.calendarEvents);
      }
    );

  }

  //show an event information as popup
  information(arg) {
    console.log(arg.event.end);
  }

  modifyTitle(eventIndex, newTitle) {
    let copyCalendarEvents = this.calendarEvents.slice(); //clone the current array
    let singleEvent = Object.assign({}, copyCalendarEvents[eventIndex]); //take the entry we want to edit
    
    singleEvent.title = newTitle; //we edit the entry
    copyCalendarEvents[eventIndex] = singleEvent; //we add said entry where it belongs in the copy calendar array
    
    this.calendarEvents = copyCalendarEvents;
  } 
}
