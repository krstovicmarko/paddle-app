import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmMatchComponent } from './confirm-match.component';

describe('ConfirmMatchComponent', () => {
  let component: ConfirmMatchComponent;
  let fixture: ComponentFixture<ConfirmMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmMatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
