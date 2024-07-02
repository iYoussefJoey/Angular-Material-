import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Cont } from '../cont';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [FormsModule,
    MatSelectModule,
   MatFormFieldModule,
   MatInputModule,
   MatAutocompleteModule,
   ReactiveFormsModule,
   AsyncPipe,
  CommonModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css'
})
export class AutocompleteComponent implements OnInit {
  countryArray:string[] = ["United States","United Kingdom","Canada","Greece"];
  filterOption!:Observable<string[]>;
  countryList!:Cont[]
  filterList!:Observable<Cont[]>
  valid: FormControl = new FormControl('')

  constructor(private _master:MasterService){
    this.countryList = this._master.getCountryList();
  }

  ngOnInit(): void {
    // this.filterOption = this.valid.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '')),
      this.filterList = this.valid.valueChanges.pipe(startWith(''),
    map(value=>this._filterList(value || '')))
    
     
  }
  private _filter(value:string):string[]{
    const filterValue = value.toLowerCase();
    return this.countryArray.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filterList (value:string):Cont[]{
    const filList = value.toLowerCase();
    return this.countryList.filter(option=>option.name.toLowerCase().includes(filList)
  || option.code.toLowerCase().includes(filList))
  }
}
