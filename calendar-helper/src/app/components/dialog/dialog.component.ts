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

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      hour: ['', Validators.required],
      city: ['', Validators.required]
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
