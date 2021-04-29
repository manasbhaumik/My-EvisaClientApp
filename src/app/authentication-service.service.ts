import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders ,HttpErrorResponse,HttpRequest,HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable,throwError, observable } from 'rxjs';
import { map,catchError } from 'rxjs/operators';


//import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})

// export class Token{
//   grant_type :string;
//   username:string;
//   password:string;
// }

export class AuthenticationServiceService {

  private TEST_API_SERVER  = "https://www.midevs.com.my/arb-service";//"https://1.9.116.25/ARB-Service";//"http://192.168.0.10/ARB-Service";
  private TEST_API_SERVER1 = "https://localhost:44372";

  constructor(private httpClient:HttpClient) { }
  public errorMessage: string = '';

  handleError(error: HttpErrorResponse) {
   let errorMessage = 'Unknown error!';
  //  this.errorMessage = error.error ? error.error : error.statusText;
  //this.errorMessage=`Error Code: ${error.status}\nMessage: ${error.message}\nStatus: ${error.status}\nError: ${error.error}`;
    // if(error.status===401||error.status===403){
    //   errorMessage=error.message;
    // }
     if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.Message}\nbody: ${error.error.data}`;
    }
   // window.alert(errorMessage);
   //return Observable.throw(errorMessage);
    return throwError(errorMessage);
  }



  userAuthentication(userName, password) {
   // var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var params=new HttpParams();
    params = params.append("username",userName);
    params = params.append("password",password);
    params = params.append("grant_type",'password');
    var data = params.toString();
    var reqHeader = new HttpHeaders({ 'Accept': 'application/json','Content-Type': 'application/x-www-form-urlencoded','No-Auth':'True' });
    return this.httpClient.post(this.TEST_API_SERVER + '/token', data)
      //.pipe(catchError(this.handleError));
      .pipe(
        map(res => res),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }));
  }

  public sendGetRequest(){
    return this.httpClient.get(this.TEST_API_SERVER+'/api/Account/FirstTimeUserLogin')
      .pipe(catchError((error,caught)=>{
        return this.handleError(error);
      }));
  }

  private encodeParams(params: any): string {

    let body: string = "";
    for (let key in params) {
        if (body.length) {
            body += "&";
        }
        body += key + "=";
        body += encodeURIComponent(params[key]);
    }

    return body;
  }
}
