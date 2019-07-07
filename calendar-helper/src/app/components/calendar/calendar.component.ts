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
  MatInputModule,
  MatSnackBarModule,
  MatSnackBar
} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

//moment module for dates
import * as moment from 'moment';
import { Action } from 'rxjs/internal/scheduler/Action';

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

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    ) {}

  ngOnInit() {}

  addReminder(arg) {
    const dialogConfig = new MatDialogConfig;

    //position of the dialog that will open
    dialogConfig.direction = 'ltr'
    //dont let user click outside dialog to close
    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {date: arg.date};
    this.dialogHandler(arg, dialogConfig);
  }

  //show an event information as popup
  information(arg) {
    //set up the message to show
    let message = arg.event.title + ' ' +arg.event.extendedProps.city;
    this.openSnackBar(message);
  }

  //snackbar to show the information about the events
  openSnackBar(message: string, action?: string) {
    this.snackbar.open(message, action, 
      {panelClass: ['snack-bar-style'], 
      duration: 5000,
      horizontalPosition: 'center'
    });
  } 

  //function to edit the reminder
  modifyReminder(arg) {
    const dialogConfig = new MatDialogConfig;

    //position of the dialog that will open
    dialogConfig.direction = 'ltr';

    //dont let user click outside dialog to close
    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    //current id
    const _eventId = arg.event.id;

    dialogConfig.data = {
      title: arg.event.title,
      city: arg.event.extendedProps.city,
      hour: arg.event.extendedProps.hour,
      date: arg.event.start,
      color: arg.event.backgroundColor
    }
    console.log(arg);
    this.dialogHandler(arg, dialogConfig, _eventId);
  }

  //add and edit reminder do the same so there is no point in having the same code twice
  //its better to have it in a single place and pass the necessary parameters
  dialogHandler(arg, dialogConfig, id?) {

    //open dialog calling the dialog component and receive the save data (if any)
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    let _eventId: number;
    let _eventDate;

    //add and edit have different callback objects thus we need to make validations
    //to treat each of them accordingly
    
    //if we receive arg.date it means its from the add reminder function
    if (arg.date) {
      _eventDate = arg.date;
    } else {
      //if we dont receive it, it comes from the edit reminder function
      _eventDate = moment(arg.event.start).format('YYYYMMDD');
    }
    
    //if we receive data back we subscribe to it
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          //if the registry already exist we will pass its own id
          if (id) {
            _eventId = parseInt(id);
          } else {
            this._id = this._id + 1;
            _eventId = this._id;
          }

          let hourMinutes = data.hour.split(":");

          //we add the hour and minutes to the date registered
          var aStart = moment(_eventDate).add(hourMinutes[0], 'hours').add(hourMinutes[1],'minutes').format();
          var anEnd = moment(_eventDate).add(hourMinutes[0], 'hours').add(hourMinutes[1]+1,'minutes').format();
          
          var color = data.color == null ? "" : data.color;

          if (id) {
            let eventIndex = this.calendarEvents.findIndex(item => item.id === id);
            if (eventIndex !== 1) {
              //if the item is found then we replace it
              this.calendarEvents.splice(eventIndex, 1)
              this.calendarEvents = this.calendarEvents.concat({
                id: _eventId,
                title: data.title,
                start: aStart,
                end: anEnd,
                hour: data.hour,
                city: data.city,
                backgroundColor: color,
                borderColor: color
              });
              this.openSnackBar("Event edited"); 
            }
          } else {
            this.calendarEvents = this.calendarEvents.concat({
              id: _eventId,
              title: data.title,
              start: aStart,
              end: anEnd,
              hour: data.hour,
              city: data.city,
              backgroundColor: color,
              borderColor: color
            });
            this.openSnackBar("New event added");
          }
        }
        console.log(this.calendarEvents);
      }
    );
  }
}
