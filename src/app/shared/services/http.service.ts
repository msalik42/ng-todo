import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public API_URL: string = '';

  constructor(private _http: HttpClient) {}

  get(
    url: string,
    params?: any,
    withCredentials: boolean = false,
    showLoader = true
  ): Observable<any> {
    return this._http.get(this.API_URL + url, {
      params,
      withCredentials: withCredentials,
      reportProgress: showLoader,
    });
  }

  post(url: string, params?: any, showLoader = true): Observable<any> {
    return this._http.post(this.API_URL + url, params, {
      reportProgress: showLoader,
    });
  }

  put(url: string, params?: any, showLoader = true): Observable<any> {
    return this._http.put(this.API_URL + url, params, {
      reportProgress: showLoader,
    });
  }

  delete(url: string, params?: any, showLoader = true): Observable<any> {
    return this._http.delete(this.API_URL + url, params);
  }
}
