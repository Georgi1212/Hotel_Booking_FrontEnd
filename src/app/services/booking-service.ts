import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
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

  getBookingsByEmail(email:string) : Observable<any> {
    return this.http.get(`http://localhost:8080/hotels/${email}/bookings`, {headers: this.headers});
  }

  getBookingsByHotelId(hotelId: number) : Observable<any> {
    return this.http.get(`http://localhost:8080/hotels/hotel/${hotelId}/bookings`, {headers: this.headers});
  }

  getBookingByHotelIdForTimePeriod(hotelId: number, startDate: Date, endDate: Date) : Observable<any> {
    const formattedStartDate = this.formatDate(startDate);
    const formattedEndDate = this.formatDate(endDate);

    const params = new HttpParams()
      .set('startDate', formattedStartDate || '')
      .set('endDate', formattedEndDate || '');

    return this.http.get(`http://localhost:8080/hotels/hotel/${hotelId}/bookings/timePeriod`, {params: params, headers: this.headers});
  }

  getBookingsByHotelIdRoomIdForTimePeriod(hotelId: number, roomId: number, startDate: Date, endDate: Date) : Observable<any>{
    const formattedStartDate = this.formatDate(startDate);
    const formattedEndDate = this.formatDate(endDate);

    const params = new HttpParams()
      .set('startDate', formattedStartDate || '')
      .set('endDate', formattedEndDate || '');

    return this.http.get(`http://localhost:8080/hotels/${hotelId}/rooms/${roomId}/bookings/timePeriod`, {params: params, headers: this.headers});
  }

  addBooking(email:string, toCreateBooking: any) : Observable<any> {
    return this.http.post(`http://localhost:8080/hotels/${email}/newBooking`, toCreateBooking, {headers: this.headers});
  }
}
