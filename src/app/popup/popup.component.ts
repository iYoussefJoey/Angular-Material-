import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';

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
import { MasterService } from '../master.service';

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
    MatSelectModule,
  ],
  
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css',
})
export class PopupComponent implements OnInit {
  inputData:any
  closeMessage:string = 'Close Used Directive'
  formPop: FormGroup;
  editData:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any 
  ,private dialog: MatDialogRef<PopupComponent>,
  private formB:FormBuilder,
  private master:MasterService
) {
  this.formPop= this.formB.group({
    id:(''),
    name: (''),
    phone:(''),
    email:(''),
    status:('')
  })
  
}
  ngOnInit(): void {
    this.inputData= this.data;
    if(this.inputData.code>0){
      this.setPopUp(this.inputData.code)
    }
    }
    setPopUp(code:any){
      this.master.getCustomerByCode(code).subscribe(data=>{
        this.editData=data
        this.formPop.setValue({
          id: this.editData.id,
          name: this.editData.name,
          phone: this.editData.phone,
          email: this.editData.email,
          status: this.editData.status
        })
      });
    }
  closePopUp(){
    this.dialog.close('Close this function');

  }
  onSave(){
    console.log(this.formPop.value);
    this.formPop.valueChanges
    this.master.saveCustomer(this.formPop.value).subscribe(data=>{
      this.closePopUp();
    });
  }

}
