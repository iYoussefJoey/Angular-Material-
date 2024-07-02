import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';


@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [MatSliderModule, FormsModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  selectedValue:number = 25;
  startValue:number=5;
  endValue:number=95;
}
