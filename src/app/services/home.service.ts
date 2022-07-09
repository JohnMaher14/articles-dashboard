import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  getClientMessages():Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}contacts_index`)
  }
  getStatistics():Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}search`)
  }
  getGeneralStatistics():Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}homeCount`)
  }
  submitData(start_date:any , endDate:any) :Observable<any> {
    const params = new HttpParams()
    .set('start_date', start_date)
    .set('endDate', endDate);
    return this._HttpClient.post(`${environment.apiUrl}search`  ,
    params
    )
  }
}
