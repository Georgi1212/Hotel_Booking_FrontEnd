import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class VerifyService {
  constructor(private http: HttpClient) {}

  verifyEmail(verifyCode:string): Observable<any>{
    //const encodedEmail = encodeURIComponent(email);
    return this.http.patch(`http://localhost:8080/users/verifyEmail/${verifyCode}`, {});
  }

}
