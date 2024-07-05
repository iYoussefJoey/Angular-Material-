import { Routes } from '@angular/router';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { InputComponent } from './input/input.component';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';
import { SliderComponent } from './slider/slider.component';
import { TableComponent } from './table/table.component';
import { FormsdesignComponent } from './formsdesign/formsdesign.component';
import { PopupComponent } from './popup/popup.component';
import { AssociateComponent } from './associate/associate.component';

export const routes: Routes = [
    {path:'',redirectTo:'home', pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'autocomplete',component:AutocompleteComponent},
    {path:'input',component:InputComponent},
    {path:'card',component:CardComponent},
    {path:'slider',component:SliderComponent},
    {path:'table',component:TableComponent},
    {path:'forms',component:FormsdesignComponent},
    {path:'formarray',component:AssociateComponent},




];
