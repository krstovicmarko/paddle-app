import { Injectable } from '@angular/core';
import { WebApiService } from './web-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourtService {
  private apiUrl = 'Court'; // Replace with your API URL
  constructor(private http: WebApiService) { }

  getItems(): Observable<any[]> {
          return this.http.get(this.apiUrl);
        }
  getItem(id: number): Observable<any> {
          return this.http.get(`${this.apiUrl}/${id}`);
        }
}
