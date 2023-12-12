import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PasswordRequest} from "../model/password";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }

  resetPassword(verifyCode: string, passwordDto: PasswordRequest): Observable<any>{
    return this.http.patch(`http://localhost:8080/resetPassword/${verifyCode}`, passwordDto);
  }
}
