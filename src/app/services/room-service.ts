import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
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

  addRoom(hotelId: number, room: any) : Observable<any> {
    return this.http.post(`http://localhost:8080/hotels/${hotelId}/newRoom`, room, {headers: this.headers});
  }

  addPhotosToRoom(hotelId: number, roomId: number, images: File[]) : Observable<any> {
    const formData = new FormData();

    for(let i = 0; i < images.length; ++i){
      formData.append('imageUrl', images[i]);
    }

    return this.http.post(`http://localhost:8080/hotels/${hotelId}/rooms/${roomId}/newImage`, formData, {headers: this.headers});
  }

}
