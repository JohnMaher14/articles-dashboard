import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private _HttpClient:HttpClient
  ) { }

  getAllComments(id:number) :Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}comment_index/${id}`)
  }
  getCommentDetails(id:number) :Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}comment_data/${id}`)
  }
  enableComment(id:number , formData:any):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}comment_recover/${id}` , formData)
  }
  disableComment(id:number , formData:any):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}comment_destroy/${id}` , formData)
  }
  createComment(
    title:string,
    text:string,
    post_id:any,
    comment_status:any
  ): Observable<any>{
    var formData = new FormData();
    formData.append('title',title);
    formData.append('text',text);
    formData.append('post_id',post_id);
    formData.append('comment_status',comment_status);
    return this._HttpClient.post(`${environment.apiUrl}comment_store`, formData);
  }
  updateComment(
    id:number,
    title:string,
    text:string,
    comment_status:any
  ): Observable<any>{
    var formData = new FormData();
    formData.append('title',title);
    formData.append('text',text);
    formData.append('comment_status',comment_status);
    return this._HttpClient.post(`${environment.apiUrl}comment_update/${id}`,formData);
  }
  deleteGallery(id:number , formData:any):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}gallery_destroy/${id}` , formData)
  }
}
