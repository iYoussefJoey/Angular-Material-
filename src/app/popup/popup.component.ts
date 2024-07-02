import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css',
})
export class PopupComponent implements OnInit {
  inputData:any
  closeMessage:string = 'Close Used Directive'
  formPop: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any 
  ,private dialog: MatDialogRef<PopupComponent>,
  private formB:FormBuilder
) {
  this.formPop= this.formB.group({
    name: (''),
    email:(''),
    phone:(''),
    status:(''),
  })
}
  ngOnInit(): void {
    this.inputData= this.data;
    }
  closePopUp(){
    this.dialog.close('Close this function')
  }
  onSave(formPop:FormGroup){
    console.log(this.formPop)
  }

}
