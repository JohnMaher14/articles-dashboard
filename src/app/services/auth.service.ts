import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenExpirationTime:any;
  currentUserData: any = new BehaviorSubject(null);
  userDataContainer:any[]=[];
  constructor(private _HttpClient: HttpClient , private _Router:Router) {
    if (localStorage.getItem('currentUserToken')) {
      this.saveCurrentUserToken();
    }

  }


  login(loginUserData: any): Observable<any> {
    return this._HttpClient.post(
      `${environment.apiUrl}auth/signin`,
      loginUserData
    );
  }

  saveCurrentUserToken() {
    let encodedToken: any = localStorage.getItem('currentUserToken');
    this.currentUserData.next(encodedToken)

  }
  autoLogout(){
    let encodedExpiresIn: any = localStorage.getItem('currentUserExpiresIn');

    const ExpiresDate: any = new Date(encodedExpiresIn).getTime() - new Date().getTime();
    if (ExpiresDate && (Date.now() > ExpiresDate)) {
      this.signOut();
      this._Router.navigate(['/auth']);
    }
  }


  signOut(){
    this.currentUserData.next(null);
    localStorage.removeItem('currentUserToken');
    localStorage.removeItem('currentUserExpiresIn');
    localStorage.removeItem('currentUsername');
    this._Router.navigate(['/auth']);
    if (this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime)
    }
    this.tokenExpirationTime= null;

  }}
