import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationTypeService extends BaseService {

  // getApplicationById(appId: string): Observable<server.participantModel> {
  //   return this.get(
  //     `api/Applications?id=${appId}`
  //   );
  // }

}
