import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { register } from 'src/app/model/Register';

export class User {
  constructor(
    public status: string,
  ) { }

}

export class JwtResponse {
  constructor(
    public jwttoken: string,
  ) { }

}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticate(username, password) {
    console.log(username, password);
    return this.httpClient.post<any>('http://localhost:8080/authenticate', {username, password}).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          let tokenStr = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', tokenStr);
          sessionStorage.setItem('language', 'ko');
          console.log(username, tokenStr);
          return userData;
        }
      )
    );
  }

  register(user: register) {
    console.log(user);
    return this.httpClient.post<any>('http://localhost:8080/register', user);
  }


  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  goToSettings(username, password) {
    return this.httpClient.post<any>('http://localhost:8080/authenticate', {username, password}).pipe(
      map(
        userData => {
          sessionStorage.setItem('verify', username);
          return userData;
        }
      )
    );
  }
  isUserVerify() {
    let user = sessionStorage.getItem('verify' && 'username')
    return !(user === null)
  }

  getUserLogin() {
    let username = sessionStorage.getItem('username')
    return username
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}