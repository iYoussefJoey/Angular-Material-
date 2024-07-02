import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsdesignComponent } from './formsdesign.component';

describe('FormsdesignComponent', () => {
  let component: FormsdesignComponent;
  let fixture: ComponentFixture<FormsdesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsdesignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormsdesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
