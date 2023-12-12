import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Email} from "../model/email";


@Injectable({
  providedIn: 'root'
})
export class ResetPasswordEmailService {

  constructor(private http: HttpClient) {}

  sendPasswordResetEmail(emailDto: Email): Observable<any>{
    return this.http.post(`http://localhost:8080/sendPasswordResetEmail`, emailDto);
  }
}
