import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  getAllAdmins():Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}admin_index`)
  }
  getAdminDetails(id:number): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}admin_update_data/${id}`)

  }
  createAdmin(formData:any): Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}admin_store` , formData)
  }
  updateAdmin(
    id:number,
    name:any,
    phone:any,
    email: any,
    role:any
    ) :Observable<any>{
    const params = new HttpParams()
    .set('name', name)
    .set('phone', phone)
    .set('email', email)
    .set('role', role);
    return this._HttpClient.post(`${environment.apiUrl}admin_update/${id}` , params)
  }
  deleteAdmin(id:number , formData:any): Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}admin_destroy/${id}` , formData)
  }
}
