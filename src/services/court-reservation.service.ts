import { Injectable } from '@angular/core';
import { WebApiService } from './web-api.service';
import { map, Observable } from 'rxjs';
import { CourtReservation } from '../model/court-reservation';
@Injectable({
  providedIn: 'root'
})
export class CourtReservationService {
  private apiUrl = 'CourtReservation'; // Replace with your API URL
  constructor(private http: WebApiService) { }

  getCourtReservations(courtId: number, court_num: number, date: Date): Observable<any[]> {
    return this.http.get(`${this.apiUrl}/${courtId}/${court_num}/${date}`);
  }

  getCourtReservationsForUser(userId: number, startDate: Date, endDate: Date): Observable<any[]> {
    return this.http.get(`${this.apiUrl}/ForUser/${userId}/${startDate.toDateString()}/${endDate.toDateString()}`);
  }

  addCourtReservation(courtReservation: CourtReservation) {
    return this.http.post(`${this.apiUrl}`, courtReservation)
      .pipe(map((result: CourtReservation) => {
        return result;
      }));
  }
}
