import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchConfirmationsComponent } from './match-confirmations.component';

describe('MatchConfirmationsComponent', () => {
  let component: MatchConfirmationsComponent;
  let fixture: ComponentFixture<MatchConfirmationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchConfirmationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchConfirmationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
