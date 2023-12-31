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

  getBookingsByHotelIdForTimePeriod(hotelId: number, startDate: Date, endDate: Date) : Observable<any> {
    const formattedStartDate = this.formatDate(startDate);
    const formattedEndDate = this.formatDate(endDate);

    const params = new HttpParams()
      .set('startDate', formattedStartDate || '')
      .set('endDate', formattedEndDate || '');

    return this.http.get(`http://localhost:8080/hotels/hotel/${hotelId}/bookings/timePeriod`, {params: params, headers: this.headers});
  }

  getBookingsByHotelIdRoomId(hotelId: number, roomId: number) : Observable<any>{
    return this.http.get(`http://localhost:8080/hotels/${hotelId}/rooms/${roomId}/bookings`, {headers: this.headers});
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

  makePayment(sum: string, hotelId:number, roomId:number, check_in:string, check_out:string) : Observable<string> {
    return this.http.post(`http://localhost:8080/pay?sum=`+sum+'&hotelId='+hotelId.toString()+'&roomId='+roomId.toString()+'&check_in='+check_in+'&check_out='+check_out, {},
      {headers: this.headers, responseType: 'text'});
  }

  completePayment(paymentId: string, PayerID: string) : Observable<any> {
    return this.http.get('http://localhost:8080/pay/success?paymentId='+paymentId+'&PayerID='+PayerID,
      {headers: this.headers, responseType: 'text'});
  }

  deleteBooking(bookingId: number) : Observable<any>{
    return this.http.delete(`http://localhost:8080/hotels/booking/${bookingId}`, {headers: this.headers});
  }
}
