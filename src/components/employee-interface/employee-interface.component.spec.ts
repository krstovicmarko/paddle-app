import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInterfaceComponent } from './employee-interface.component';

describe('EmployeeInterfaceComponent', () => {
  let component: EmployeeInterfaceComponent;
  let fixture: ComponentFixture<EmployeeInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeInterfaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
