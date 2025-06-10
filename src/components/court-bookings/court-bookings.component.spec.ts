import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtBookingsComponent } from './court-bookings.component';

describe('CourtBookingsComponent', () => {
  let component: CourtBookingsComponent;
  let fixture: ComponentFixture<CourtBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtBookingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourtBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
