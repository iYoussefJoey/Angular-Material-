import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Element } from '../element';
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
    MatIconModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Element>();
  displayedColums: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'action',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isEditing:boolean[] = []
  constructor(private _master: MasterService, private dialog:MatDialog,
   ) {}

  ngOnInit(): void {
    this.dataSource.data = this._master.getMembersNames();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  removeClient(client: Element) {
    const index = this.dataSource.data.indexOf(client);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }
  editClient(index:number){
    this.isEditing[index] = true ;
  }
  saveClient(inedex:number){
    this.isEditing[inedex] = false ;
    this.dataSource._updateChangeSubscription();
  }
  openPopUp(){
    let _popup = this.dialog.open(PopupComponent,{
      width:'50%',
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'400ms'
      ,data:{
        title:'User Data',
        
      }
    });
    _popup.afterClosed().subscribe((title)=>{
      console.log(title)
    })
  }
  closePopUp(){
    this.dialog.closeAll();
  }
  
}
