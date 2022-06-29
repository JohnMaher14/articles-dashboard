import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  getClientMessages():Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}contacts_index`)
  }
  getContactData(): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}contact_us_index`)
  }
  updateContactData(
    email: string,
    location: string,
    address: string,
    phone: string,
    facebook: string,
    twitter: string,
    instagram: string,
    map_link: string,
    banner_image: File,

  ): Observable<any>{
    var formData = new FormData();
    formData.append('email',email);
    formData.append('location',location);
    formData.append('address',address);
    formData.append('phone',phone);
    formData.append('facebook',facebook);
    formData.append('twitter',twitter);
    formData.append('instagram',instagram);
    formData.append('map_link',map_link);

    formData.append('banner_image',banner_image);

    return this._HttpClient.post(`${environment.apiUrl}contact_us_data/1`, formData)
  }
}
