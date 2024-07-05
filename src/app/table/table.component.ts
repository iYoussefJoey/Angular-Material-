import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MasterService } from '../master.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { Customer } from '../customer';
import { UserdetailsComponent } from '../userdetails/userdetails.component';




@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  // dataSource = new MatTableDataSource<Element>();
  displayedColums: string[] = [
    "id",
    "name",
    "phone", 
    "email", 
    "status",
    "action",
  ];
  dataClient = new MatTableDataSource<Customer>
  customerList:Customer[]=[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isEditing:boolean[] = []
  constructor(private _master: MasterService, private dialog:MatDialog,
   ) {
    this.ngOnInit();
   }

  ngOnInit() {
    this._master.getClients().subscribe((data)=>{
      this.customerList = data;
      this.dataClient = new MatTableDataSource<Customer>(this.customerList);
      this.dataClient.paginator = this.paginator;
      this.dataClient.sort= this.sort;
    })
  }
 
  removeClient(client: Customer) {
    const index = this.dataClient.data.indexOf(client);
    this.dataClient.data.splice(index, 1);
    this.dataClient._updateChangeSubscription();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataClient.filter=filterValue.trim().toLowerCase();
  }
  editCustomer(code:any, ){
    this.openPopUp(code,'Edit',PopupComponent)
  }
  addCustomer(){
    this.openPopUp(0,'Add',PopupComponent)
  }
  detailsCustomer(code:any){
    this.openPopUp(code,'Edit',UserdetailsComponent)

  }
  openPopUp(code:any , title:any, component:any){
    let _popup = this.dialog.open(component,{
      width:'50%',
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'400ms'
      ,data:{
        title:title,
        code:code,
        
      }
    });
    _popup.afterClosed().subscribe((title)=>{
      // console.log(title)
      this.ngOnInit();
    })
  }
  
}
