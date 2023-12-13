import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {DatePipe} from "@angular/common";


@Injectable({
  providedIn: 'root'
})
export class HotelService{
  private token: string;
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token') || '';
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  getUniqueCountries(): Observable<string[]>{
     return this.http.get<string[]>('http://localhost:8080/hotels/unique-countries', {headers: this.headers});
   }

   getUniqueCities(country: string) : Observable<any>{
     const formattedCountry = encodeURIComponent(country);
    return this.http.get(`http://localhost:8080/hotels/${formattedCountry}/cities`, {headers: this.headers});
   }

   getAvailableHotels(country: string, city: string, checkIn: Date, checkOut: Date) : Observable<any> {
    const formattedCountry = encodeURIComponent(country);
    const formattedCity = encodeURIComponent(city);
    const formattedCheckIn = this.formatDate(checkIn);
    const formattedCheckOut = this.formatDate(checkOut);

    const params = new HttpParams()
      .set('country', formattedCountry)
      .set('city', formattedCity || '')
      .set('checkIn', formattedCheckIn || '')
      .set('checkOut', formattedCheckOut || '');

    return this.http.get('http://localhost:8080/hotels/available', {params: params, headers: this.headers});
   }

}
