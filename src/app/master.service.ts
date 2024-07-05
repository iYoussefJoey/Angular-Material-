import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';
import { Countries } from './countries';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private _http: HttpClient) {}
  getCountryList() {
    return [
      { code: '1st', name: 'USA' },
      { code: '2nd', name: 'Canada' },
      { code: '3rd', name: 'UK' },
      { code: '4th', name: 'Greece' },
      { code: '5th', name: 'Japan' },
    ];
  }
  getClients(): Observable<Customer[]> {
    return this._http.get<Customer[]>('http://localhost:3000/customer');
  }
  deleteClients(): Observable<Customer[]> {
    return this._http.delete<Customer[]>('http://localhost:3000/customer');
  }
  saveCustomer(names: any) {
    return this._http.post('http://localhost:3000/customer', names);
  }
  getCustomerByCode(code: any) {
    return this._http.get('http://localhost:3000/customer/' + code);
  }
  getFormArray(){
    return this._http.get('http://localhost:3000/associate/');
  }

  getFormArrayByCode(code:any){
    return this._http.get('http://localhost:3000/associate/'+code);
  }
  getCounrtyListForAutoComplete():Observable<Countries[]>{
    return this._http.get<Countries[]>('http://localhost:3000/country');

  }
  saveForms(data:any , code:any){
    return this._http.put('http://localhost:3000/associate/'+code,data);
  }
}