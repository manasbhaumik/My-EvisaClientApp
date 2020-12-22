import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private httpClient: HttpClient) { }

    private header() {
        return {
            headers: new HttpHeaders()
                .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
        };
    }

    protected get<T>(url: string) {
        return this.httpClient.get<T>(
            `${environment.baseUrl}/${url}`,
            this.header()
        );
    }

    protected delete(url: string) {
        return this.httpClient.delete(
            `${environment.baseUrl}/${url}`,
            this.header()
        );
    }

    protected post<T>(url: string, data: any) {
        return this.httpClient.post<T>(
            `${environment.baseUrl}/${url}`,
            data,
            this.header()
        );
    }

    protected postBlob(url: string, payload: any) {

        const header = this.header();

        return this.httpClient.post(
            `${environment.baseUrl}/${url}`,
            payload, {
            headers: header.headers,
            responseType: 'blob'
        }
        );

    }

    protected put<T>(url: string, data: any) {
        return this.httpClient.put<T>(
            `${environment.baseUrl}/${url}`,
            data,
            this.header()
        );
    }
}
