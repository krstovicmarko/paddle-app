import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuePaymentsComponent } from './due-payments.component';

describe('DuePaymentsComponent', () => {
  let component: DuePaymentsComponent;
  let fixture: ComponentFixture<DuePaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuePaymentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DuePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
