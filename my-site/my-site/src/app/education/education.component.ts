import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent {
  constructor(
    private _dialog: MatDialog,
    //private alertService: AlertService,
    private dialogRef: MatDialogRef<EducationComponent>
  ) {}
  close() {
    this.dialogRef.close();
    //alert('click');
  }
}
