import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders ,HttpErrorResponse,HttpRequest,HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable,throwError, observable } from 'rxjs';
import { map,catchError } from 'rxjs/operators';

const TEST_API_SERVER = 'https://localhost:44372';
const TEST_API_SERVER1 = 'http://192.168.0.10/ARB-Service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  userAuthentication(userName, password):Observable<any> {
    // var data = "username=" + userName + "&password=" + password + "&grant_type=password";
     var params=new HttpParams();
     params = params.append("username",userName);
     params = params.append("password",password);
     params = params.append("grant_type",'password');
     var data = params.toString();
     var reqHeader = new HttpHeaders({ 'Accept': 'application/json','Content-Type': 'application/x-www-form-urlencoded','No-Auth':'True' });
     return this.http.post(TEST_API_SERVER + '/token', data)
       //.pipe(catchError(this.handleError));
       .pipe(  
         map(res => res),  
         catchError((error: HttpErrorResponse) => {  
           return throwError(error);  
         }));
   }
}
