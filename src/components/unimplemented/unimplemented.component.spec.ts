import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnimplementedComponent } from './unimplemented.component';

describe('UnimplementedComponent', () => {
  let component: UnimplementedComponent;
  let fixture: ComponentFixture<UnimplementedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnimplementedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnimplementedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
