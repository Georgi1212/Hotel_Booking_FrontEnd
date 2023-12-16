import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Hotel} from "../model/hotel";
import {Room} from "../model/room";
import {RoomWithId} from "../model/roomWithID";


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
  formatDate(date: Date): string {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = ('0' + (newDate.getMonth() + 1)).slice(-2);
    const day = ('0' + newDate.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  getUniqueCountries(): Observable<string[]>{
     return this.http.get<string[]>('http://localhost:8080/hotels/unique-countries', {headers: this.headers});
   }

   getUniqueCities(country: string) : Observable<any>{
     const formattedCountry = encodeURIComponent(country);
    return this.http.get(`http://localhost:8080/hotels/${formattedCountry}/cities`, {headers: this.headers});
   }

   getHotelById(hotelId: number) : Observable<Hotel>{
    return this.http.get<Hotel>(`http://localhost:8080/hotels/hotel/${hotelId}`, {headers : this.headers});
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

   getHotelByCountryCityStreet(country: string, city: string, street: string) : Observable<number> {
     const formattedCountry = encodeURIComponent(country);
     const formattedCity = encodeURIComponent(city);
     const formattedStreet = encodeURIComponent(street);

     return this.http.get<number>(`http://localhost:8080/hotels/${formattedCountry}/${formattedCity}/${formattedStreet}`,
       {headers: this.headers});
   }

   getAvailableRooms(hotelId: number, checkIn: Date, checkOut: Date) : Observable<RoomWithId[]> {
     const formattedCheckIn = this.formatDate(checkIn);
     const formattedCheckOut = this.formatDate(checkOut);

     const params = new HttpParams()
       .set('checkIn', formattedCheckIn || '')
       .set('checkOut', formattedCheckOut || '');

     return this.http.get<RoomWithId[]>(`http://localhost:8080/hotels/${hotelId}/availableRooms`, {params: params, headers: this.headers});
   }

   getHotelsByEmail(email: string) : Observable<any>{
     return this.http.get(`http://localhost:8080/hotels/user/${email}`, {headers: this.headers});
   }

   getAllRoomsByHotelId(hotelId: number) : Observable<RoomWithId[]> {
     return this.http.get<RoomWithId[]>(`http://localhost:8080/hotels/${hotelId}/rooms`, {headers: this.headers});
   }
}
