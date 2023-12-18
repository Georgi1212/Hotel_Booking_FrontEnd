import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoomImage} from "../model/roomImage";
import {Room} from "../model/room";


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

  getRoomByHotelIdRoomId(hotelId: number, roomId: number) : Observable<Room>{
    return this.http.get<Room>(`http://localhost:8080/hotels/${hotelId}/rooms/${roomId}`, {headers: this.headers});
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

  updateRoom(hotelId: number, roomId: number, newRoom:Room) : Observable<any> {
    return this.http.patch(`http://localhost:8080/hotels/${hotelId}/rooms/${roomId}`, newRoom, {headers: this.headers});
  }

  deleteRoom(hotelId: number, roomId: number) : Observable<any> {
    return this.http.delete(`http://localhost:8080/hotels/${hotelId}/rooms/${roomId}`, {headers: this.headers});
  }

}
