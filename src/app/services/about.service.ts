import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(
    private _HttpClient:HttpClient
  ) {}

  getAboutUsTable(): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}about_us_page_index`)
  }
  UpdateAboutUs(

    about_section_title: string,
    about_section_text: string,
    first_media_title: string,
    first_media_text: string,
    second_media_title: string,
    second_media_text: string,
    third_media_title: string,
    third_media_text: string,
    according_first_title: string,
    according_first_text: string,
    according_second_title: string,
    according_second_text: string,
    according_third_title: string,
    according_third_text: string,
    according_fourth_title: string,
    according_fourth_text: string,
    according_fivth_title: string,
    according_fivth_text: string,
    according_image: File,
    about_banner_image: File,
    about_section_image: File,
  ):Observable<any>{
    var formData = new FormData();
    formData.append('about_section_title',about_section_title);
    formData.append('about_section_text',about_section_text);
    formData.append('first_media_title',first_media_title);
    formData.append('first_media_text',first_media_text);
    formData.append('second_media_title',second_media_title);
    formData.append('second_media_text',second_media_text);
    formData.append('third_media_title',third_media_title);
    formData.append('third_media_text',third_media_text);
    formData.append('according_first_title',according_first_title);
    formData.append('according_first_text',according_first_text);
    formData.append('according_second_title',according_second_title);
    formData.append('according_second_text',according_second_text);
    formData.append('according_third_title',according_third_title);
    formData.append('according_third_text',according_third_text);
    formData.append('according_fourth_title',according_fourth_title);
    formData.append('according_fourth_text',according_fourth_text);
    formData.append('according_fivth_title',according_fivth_title);
    formData.append('according_fivth_text',according_fivth_text);
    formData.append('according_image',according_image);
    formData.append('about_banner_image',about_banner_image);
    formData.append('about_section_image',about_section_image);
    return this._HttpClient.post(`${environment.apiUrl}about_us_page_update/1`,

      formData,
      {
        reportProgress: true,
        observe:'events'
      }
    )
  }
}
