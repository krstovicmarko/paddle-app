import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookACourtComponent } from './book-a-court.component';

describe('BookACourtComponent', () => {
  let component: BookACourtComponent;
  let fixture: ComponentFixture<BookACourtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookACourtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookACourtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
