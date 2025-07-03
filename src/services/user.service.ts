import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 private apiUrl = 'WeatherForecast'; // Replace with your API URL

      constructor(private http: WebApiService) { }

      getItems(): Observable<any[]> {
        return this.http.get(this.apiUrl);
      }

      getItem(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`);
      }

      createItem(item: any): Observable<any> {
        return this.http.post(this.apiUrl, item);
      }

      updateItem(id: number, item: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, item);
      }

      deleteItem(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
      }
}
