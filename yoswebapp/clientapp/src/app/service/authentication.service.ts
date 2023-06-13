import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { register } from 'src/app/model/Register';
import { DOCUMENT } from '@angular/common';

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
  
   /**
   * Api Url
   */
  private readonly ApiUrl: string;

  constructor(private httpClient: HttpClient, @Inject(DOCUMENT) private document: Document) {
    this.ApiUrl = document.location.origin;}

  /**
   * 로그인 및 토큰생성
   * @param usrid 
   * @param usrpw
   */
  authenticate(usrid, usrpw) {
    return this.httpClient.post<any>(`${this.ApiUrl}/api/authenticate`, {usrid, usrpw}).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', usrid);
          let tokenStr = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', tokenStr);

          return userData;
        }
      )
    );
  }
  
  /**
   * 계정 정보 호출
   * @param usrid 
   */
  userinfo(usrid) {
    return this.httpClient.post<register>(`${this.ApiUrl}/api/userinfo`, {usrid})
  }
  /**
   * 아이디 중복 확인
   * @param usrid 
   */
  duplicate(usrid) {
    return this.httpClient.post<any>(`${this.ApiUrl}/api/duplicate`, {usrid});
  }
  /**
   * 회원가입
   * @param user 
   */
  register(user: register) {
    return this.httpClient.post<any>(`${this.ApiUrl}/api/register`, user);
  }
  /**
   * 비밀번호 변경
   * @param usrpw 
   */
  editPw(usrid, usrpw) {
    return this.httpClient.post<any>(`${this.ApiUrl}/api/editPw`, {usrid, usrpw});
  }
  /**
   * 언어 변경 
   * @param usrid 
   * @param usrla 
   */
  editLa(usrid, usrla) {
    return this.httpClient.post<any>(`${this.ApiUrl}/api/editLa`, {usrid, usrla});
  }

  /**
   * 유저 삭제
   * @param usrid 
   * @returns 
   */
  delUser(usrid){
    return this.httpClient.post<any>(`${this.ApiUrl}/api/delUser`, {usrid});
  }


  editLaPw(usrid, usrla, usrpw){    
    return this.httpClient.post<any>(`${this.ApiUrl}/api/editLapw`, {usrid, usrla,usrpw});
  }

  /**
   * 사용자가 로그인 되었는지 확인
   */
  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }
  /**
   * 계정 정보 접근 시 사용자 재확인
   * @param usrid 
   * @param usrpw 
   */
  goToSettings(usrid, usrpw) {
    return this.httpClient.post<any>(`${this.ApiUrl}/api/authenticate`, {usrid, usrpw}).pipe(
      map(
        userData => {
          sessionStorage.setItem('verify', usrid);
          return userData;
        }
      )
    );
  }
  /**
   * 계정 정보 접근시 확인
   */
  isUserVerify() {
    let user = sessionStorage.getItem('verify')
    return user
  }

  isUserAuth() {
    let userAu = sessionStorage.getItem('authority')
    return !(userAu === 'CUSTOMER')
  }

  /**
   * 세션에서 사용자 아이디 확인
   */
  getUserLogin() {
    let username = sessionStorage.getItem('username')
    return username
  }

  /**
   * 로그아웃 시 세션 초기화
   */
  logOut() {
    sessionStorage.clear();
  }
}