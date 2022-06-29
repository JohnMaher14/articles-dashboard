import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  getAllGallery(id:number) :Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}gallery_index/${id}`)
  }
  getGalleryDetails(id:number) :Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}gallery_data/${id}`)
  }

  deleteGallery(id:number , formData:any):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}gallery_destroy/${id}` , formData)
  }
  createGallery(
    image:File,
    post_id:any,
  ): Observable<any>{
    var formData = new FormData();
    formData.append('image',image);
    formData.append('post_id',post_id);
    return this._HttpClient.post(`${environment.apiUrl}gallery_store`, formData);
  }
  updateGallery(
    id:number,
    image:File,
  ): Observable<any>{
    var formData = new FormData();
    formData.append('image',image);

    return this._HttpClient.post(`${environment.apiUrl}gallery_update/${id}`,formData);
  }
}
