import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:8080/api/login';
  private logoutUrl = 'http://localhost:8080/api/logout';
  loggedIn = false;
  private userLoginSource = new Subject<LoginUser>();
  userLogin$ = this.userLoginSource.asObservable();

  constructor(private http: HttpClient) {
  }

  login(user: LoginUser): Observable<boolean> {
    return this.http.post(this.loginUrl, user)
      .pipe(
        map(res => res as boolean),
        tap(res => {
          if (res) {
            this.userLogin(user);
          }
        }));
  }

  logout() {
    return this.http.get(this.logoutUrl)
      .pipe(
        tap(res => this.userLogout())
      );
  }

  userLogin(user: LoginUser) {
    this.loggedIn = true;
    this.userLoginSource.next(user);
  }

  userLogout() {
    this.loggedIn = false;
    this.userLoginSource.next(null);
  }
}

export class LoginUser {
  username: string;
  password: string;
}
