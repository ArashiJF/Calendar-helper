import { 
  Component, 
  OnInit, 
  Inject} 
from '@angular/core';

import { 
  FormGroup, 
  FormBuilder, 
  FormsModule, 
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

//time picker module
import { AmazingTimePickerModule } from 'amazing-time-picker';

//material imports
import {MAT_DIALOG_DATA, 
  MatDialogRef, 
  MatFormFieldModule, 
  MatButtonModule, 
  MatCardModule, 
  MatMenuModule, 
  MatToolbarModule,
  MatIconModule, 
  MatSidenavModule, 
  MatListModule,
  MatDialogModule,
  MatInputModule
} from "@angular/material";
import * as moment from 'moment';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  form: FormGroup;

  //by default we are adding a new reminder
  isAdd: boolean;
  
  title: string = '';
  hour: string = '';
  city: string = '';
  date: any;
  color: string = '';
  
  cities: string[] = [
    'Bogotá',
    'Cartagena',
    'Santa Marta',
    'Cali',
    'Medellin',
    'Barranquilla',
    'Cúcuta',
    'Pereira',
    'Bucaramanga',
    'Montería'
  ];

  //array of supported colors
  colors = [
    'red',
    'blue',
    'green',
    'violet',
    'default'
  ]

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {

    this.isAdd = true;
    if (data.title) {
      this.title = data.title == null ? '' : data.title;
      this.hour = data.hour == null ? '' : data.hour;
      this.city = data.city == null ? '' : data.city;
      this.color = data.color == null ? '' : data.color;
      //this.isAdd = false; 
    }

    //Date for showing on top of dialog form
    if (data.date) {
      this.date = moment(data.date).format('YYYY-MM-DD');
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.title, Validators.required],
      hour: [this.hour, Validators.required],
      city: [this.city, Validators.required],
      color: [this.color],
      delete: [false]
    });
  }

  //Save user inputs
  save() {
    this.dialogRef.close(this.form.value);
  }

  //close the dialog form
  close() {
    this.dialogRef.close();
  }

  delete() {
    //we check if we are adding or editing
    if (!this.isAdd) {
      //we set the delete to true
      this.form.value.delete = true;
      this.dialogRef.close(this.form.value);
    }
  }
}
