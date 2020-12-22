import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationTypeService extends BaseService {

  getApplicationById(appId: string): Observable<any> {
    return this.get(
      `api/Applications?id=${appId}`
    );
  }

  public getApplicationTypeById(ApplicationId) {
    var params = new HttpParams();
    params = params.append('id', ApplicationId);

    return this.get(
      `api/ApplicationTypes?id=${params}`
    );
  }

  // getContact():Observable<any>{
  //   var accessToken=  localStorage.getItem('auth-token');
  //    console.log(accessToken);
  //    var httpOptions = {
  //      headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}` )
  //    }
  //    return this
  //    .get('/api/UserContactsProfile',httpOptions).pipe(map(response => response));

  //  }

  public getCenterByCountryId_V01(countryId) {
    var params = new HttpParams();
    params = params.append('countryid', countryId);

    return this.get(
      `api/GetCenterByCountryId?id=${params}`
    );
  }

}
