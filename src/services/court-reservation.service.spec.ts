import { TestBed } from '@angular/core/testing';

import { CourtReservationService } from './court-reservation.service';

describe('CourtReservationService', () => {
  let service: CourtReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourtReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
