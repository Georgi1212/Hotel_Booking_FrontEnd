import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token') || '';
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  getUserType(email:string) : Observable<string> {
    return this.http.get(`http://localhost:8080/users/${email}/userType`,
      {headers: this.headers, responseType: 'text'});
  }

  getUserByEmail(email:string) : Observable<any> {
    return this.http.get(`http://localhost:8080/users/userInfo/${email}`, { headers: this.headers });
  }

  updateUser(email:string, user:any) : Observable<any> {
    return this.http.patch(`http://localhost:8080/users/updateUser/${email}`, user, { headers: this.headers });
  }

  deleteUser(email:string): Observable<any> {
    return this.http.delete(`http://localhost:8080/users/userInfo/${email}`, { headers: this.headers });
  }
}
