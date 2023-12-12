import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SignupRequest} from "../model/signup";


@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  signup(signupRequest: SignupRequest): Observable<any>{
    return this.http.post('http://localhost:8080/users/signup', signupRequest);
  }
}
