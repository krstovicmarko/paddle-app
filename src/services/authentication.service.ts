import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from "../model/user";
import { PermissionEnum } from '../model/permission-enum';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiUrl = 'https://padelwebapi.valtique.net/api'; 
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public loggedIn: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    var currentSessionUser =sessionStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User>(currentSessionUser?JSON.parse(currentSessionUser):null);
    this.currentUser = this.currentUserSubject.asObservable();

    if (this.currentUserValue) {
      this.loggedIn = new BehaviorSubject<boolean>(true);
    }
    else {
      this.loggedIn = new BehaviorSubject<boolean>(false);
    }
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentUserPermissions(): Array<PermissionEnum> {
    if (this.currentUserValue.jwtToken==null)
      return [];
    var permissions = JSON.parse(atob(this.currentUserValue.jwtToken.split('.')[1])).permission;
    var returnValue = permissions;
    if (!Array.isArray(permissions)) {
      returnValue = [permissions];
    }
    return returnValue;
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/Authentication/SignIn`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.loggedIn.next(true);
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  logout() {
    this.http.post<any>(`${this.apiUrl}/Authentication/SignOut`, {}, { withCredentials: true }).subscribe();
    this.stopRefreshTokenTimer();

    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User(0,'','','',0,0,'',[]));
    this.loggedIn.next(false);
  }

  refreshToken() {
    console.log(this.currentUserValue);

    var currentRefreshToken = this.currentUserValue.refreshToken;
    return this.http.post<any>(`${this.apiUrl}/Authentication/RefreshToken`, { refreshToken: currentRefreshToken }, { withCredentials: true })
      .pipe(map((user) => {
        console.log("Token refreshed!");
        this.currentUserSubject.next(user);
        this.loggedIn.next(true);
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  private refreshTokenTimeout: any;

  //Helpers
  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    var jwtTokenRaw = this.currentUserValue.jwtToken;
    if(jwtTokenRaw != null){
      const jwtToken = JSON.parse(atob(jwtTokenRaw.split('.')[1]));
      // set a timeout to refresh the token a minute before it expires
      const expires = new Date(jwtToken.exp * 1000);
      const timeout = expires.getTime() - Date.now();
      this.refreshTokenTimeout = setTimeout(() => {
        this.refreshToken().subscribe();
      }, timeout);
    }
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
