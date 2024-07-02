import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formsdesign',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    CommonModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './formsdesign.component.html',
  styleUrl: './formsdesign.component.css',
})
export class FormsdesignComponent implements OnInit {
  countryList = ['USA','Canada','UK','Mexio','France']
  termsList = ['15 Days','30 Days','45 Days','60 Days','75 Days']
  customerForm: FormGroup;
  constructor(private fb:FormBuilder){
    this.customerForm = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(12)]],
      email:['',[Validators.required,Validators.email]],
      phone:['',[Validators.required,Validators.pattern('^(01)[0125].[0-9]{8}$')]],
      country:['',[Validators.required]],
      address:['',[Validators.required]],
      term:['',Validators.required],
      radiobutton:['Male',Validators.required],
      checkbox:['Active',Validators.required],
      dob:['',[Validators.required,this.dob]],
      
    })

  }
  ngOnInit(): void {
    this.customerForm.setValue({
      name:'Youssef Omar',
      email:'joe_youssef@gmail.coms',
        phone:'012648733481',
        country:'Canada',
        address:'smouha el ma3adi',
        term:'60 Days',
        radiobutton:'Male',
        checkbox:'Active',
        dob:new Date("1998-12-15")
    })
  }

  onSubmit(customer:FormGroup){
    console.log(this.customerForm)
  }
  dob(control:FormControl):{[key:string] :  boolean} | null {
    let today = new Date();
    let DOB = new Date(control.value);
    if(DOB > today){
      return {invalidDate : true}
    }
    else {
      return null
    }
  }
  clearForm(){
    this.customerForm.reset();
  }


}
