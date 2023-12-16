import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoomImage} from "../model/roomImage";


@Injectable({
  providedIn: 'root'
})
export class RoomService{
  private token: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient)
  {
    this.token = localStorage.getItem('token') || '';
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  getAllImagesByHotelIdAndRoomId(hotelId: number, roomId: number) : Observable<RoomImage[]>{
    return this.http.get<RoomImage[]>(`http://localhost:8080/hotels/${hotelId}/rooms/${roomId}/images`,
      {headers: this.headers});
  }

}
