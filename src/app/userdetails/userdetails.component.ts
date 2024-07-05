import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from '../master.service';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-userdetails',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule],
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css'
})
export class UserdetailsComponent implements OnInit {
inputData:any ;
cuzData:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any
,private ref:MatDialogRef<UserdetailsComponent>
, private _Service:MasterService) {}
  
ngOnInit(): void {
  this.inputData = this.data;
  if ( this.inputData.code > 0) {
    this._Service.getCustomerByCode(this.inputData.code).subscribe(data => {
      this.cuzData = data;
    })
}};

closePop() {
  this.ref.close('close from user details');

}
}
