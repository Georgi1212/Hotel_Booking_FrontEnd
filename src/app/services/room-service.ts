import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class RoomService{

  constructor(private http: HttpClient) { }

  /*
  * resetPassword(verifyCode: string, passwordDto: PasswordRequest): Observable<any>{
    return this.http.patch(`http://localhost:8080/resetPassword/${verifyCode}`, passwordDto);
  }*/
}
