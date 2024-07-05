import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MasterService } from '../master.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { Countries } from '../countries';

@Component({
  selector: 'app-associate',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
    MatAutocompleteModule,
  ],
  templateUrl: './associate.component.html',
  styleUrl: './associate.component.css',
})
export class AssociateComponent implements OnInit {
  formList: any;
  arrayAddress!: FormArray<any>;
  customerForm: FormGroup = new FormGroup({});
  countryList!: Countries[];
  filterOptions$!: Observable<any>;
  editData: any;
  constructor(private fb: FormBuilder, private _master: MasterService) {}
  ngOnInit(): void {
    this.loadForm();
    this.intializeCustomerForm();
    this.loadCountry();
  }

  private intializeCustomerForm() {
    this.customerForm = this.fb.group({
      id: '',
      name: '',
      address: this.fb.array([]),
    });
  }

  sbumitForm() {
    console.log(this.customerForm.value);
    this._master
      .saveForms(this.customerForm.value, this.customerForm.value.id)
      .subscribe((data) => {
        console.log(data, 'saved successfully');
      });
  }
  getGroupAddress(): FormGroup {
    return this.fb.group({
      title: this.fb.control(''),
      country: this.fb.control(''),
      fulladdress: this.fb.control(''),
      city: this.fb.control(''),
      postalCode: this.fb.control(''),
    });
  }
  loadForm() {
    this._master.getFormArray().subscribe((data) => {
      this.formList = data;
      console.log(data);
    });
  }
  addAddress() {
    const customers =
      this.customerForm.value.name && this.customerForm.value.nickname;
    if (customers != '') {
      this.arrayAddress = this.customerForm.get('address') as FormArray;
      this.arrayAddress.push(this.getGroupAddress());
    } else {
      alert('please fill the form first');
    }
  }
  autoChange(index: any) {
    this.arrayAddress = this.customerForm.get('address') as FormArray;
    const countryobJ = this.arrayAddress.at(index) as FormGroup;
    const countryAuto = countryobJ.get('country') as FormControl;
    this.filterOptions$ = countryAuto.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterList(countryAuto.value || ''))
    );
  }
  private _filterList(value: any): Countries[] {
    const filterValue = value.toLowerCase();
    return this.countryList.filter(
      (option) =>
        option.name.toLowerCase().includes(filterValue) ||
        option.code.toLowerCase().includes(filterValue)
    );
  }

  get getNewArray(): FormArray {
    return this.customerForm.get('address') as FormArray;
  }

  loadCountry() {
    this._master.getCounrtyListForAutoComplete().subscribe({
      next: (data) => {
        this.countryList = data;
      },
    });
  }
  cuzChange(code: any) {
    this._master.getFormArrayByCode(code).subscribe((data) => {
      this.editData = data;
      console.log(data);

      this.arrayAddress = this.customerForm.get('address') as FormArray;
      while (this.arrayAddress.length !== 0) {
        this.arrayAddress.removeAt(0);
      }

      for (let i = 0; i < this.editData.address.length; i++) {
        this.addAddress();
      }
      this.customerForm.patchValue ({
        id: this.editData.id,
        name: this.editData.name,
        address: this.editData.address,
      });
    });
  }
}
