import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends BaseService {

  public getAllCountries() {
    return this.get('/api/GetAllCountries').pipe(map(response => response));
  }
}
