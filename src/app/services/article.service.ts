import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private _HttpClient:HttpClient
  ) { }

  getArticles(): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}post_index`)
  }
  getArticleDeatils(id:number): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}post_data/${id}`)
  }
  createArticle(
    title:string,
    text:string,
    main_image:File,
    category_id:any,
    trend_status:any,
    news_status:any,
    post_status:any,
    publish_name:any,

  ): Observable<any>{
    var formData = new FormData();
    formData.append('title',title);
    formData.append('text',text);
    formData.append('main_image',main_image);
    formData.append('category_id',category_id);
    formData.append('trend_status',trend_status);
    formData.append('news_status',news_status);
    formData.append('post_status',post_status);
    formData.append('publish_name',publish_name);
    return this._HttpClient.post(`${environment.apiUrl}post_store`, formData);
  }
  updateArticle(
    id:number,
    title:string,
    text:string,
    main_image:File,
    category_id:any,
    trend_status:any,
    news_status:any,
    post_status:any,
    publish_name:any,

  ): Observable<any>{
    var formData = new FormData();
    formData.append('title',title);
    formData.append('text',text);
    formData.append('main_image',main_image);
    formData.append('category_id',category_id);
    formData.append('trend_status',trend_status);
    formData.append('news_status',news_status);
    formData.append('post_status',post_status);
    formData.append('publish_name',publish_name);

    return this._HttpClient.post(`${environment.apiUrl}post_update/${id}`,formData);
  }
  enableArticle(id:number , formData:any):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}post_recover/${id}` , formData)
  }
  disableArticle(id:number , formData:any):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}post_destroy/${id}` , formData)
  }
  getPostCategory(
    category_id:number
  ): Observable<any>{
    const params = new HttpParams()
    .set('category_id', category_id)
    return this._HttpClient.get(`${environment.apiUrl}categoryData?${params}` , )
  }
}
