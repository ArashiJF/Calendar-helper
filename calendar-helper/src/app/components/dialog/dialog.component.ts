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

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  form: FormGroup;

  title: string = '';
  hour: string = '';
  city: string = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    if (data) {
      this.title = data.title == null ? '' : data.title;
      this.hour = data.hour == null ? '' : data.hour;
      this.city = data.city == null ? '' : data.city;  
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.title, Validators.required],
      hour: [this.hour, Validators.required],
      city: [this.city, Validators.required]
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
}
