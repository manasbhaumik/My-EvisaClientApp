import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
    localStorage.clear();
  }

  public saveToken(token: string) {
    // window.sessionStorage.removeItem(TOKEN_KEY);
   // window.sessionStorage.setItem(TOKEN_KEY, token);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
   // console.log("token1:"+token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
    //return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    console.log("user :"+localStorage.getItem(USER_KEY));
    // window.sessionStorage.removeItem(USER_KEY);
    // window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }
}
