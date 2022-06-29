import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  header = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  constructor(
    private _HttpClient:HttpClient
  ) { }
  getAllCategory() :Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}category_index`)
  }
  getCategoryDetails(id:number):Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}category_update_data/${id}`)

  }
  createCategory(
    title:string,
    text:string,
    banner_image:File,
    category_status:any
  ): Observable<any>{
    var formData = new FormData();
    formData.append('title',title);
    formData.append('text',text);
    formData.append('banner_image',banner_image);
    formData.append('category_status',category_status);
    return this._HttpClient.post(`${environment.apiUrl}category_store`, formData);
  }
  updateCategory(
    id:number,
    title:string,
    text:string,
    banner_image:File,
    category_status:any
  ): Observable<any>{
    var formData = new FormData();
    formData.append('title',title);
    formData.append('text',text);
    formData.append('banner_image',banner_image);
    formData.append('category_status',category_status);
    return this._HttpClient.post(`${environment.apiUrl}category_update/${id}`,formData);
  }
  enableCategory(id:number , formData:any):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}category_recover/${id}` , formData)
  }
  disableCategory(id:number , formData:any):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}category_destroy/${id}` , formData)
  }
}
