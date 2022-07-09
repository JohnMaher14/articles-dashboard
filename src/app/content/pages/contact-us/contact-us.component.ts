import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ContactsService } from 'src/app/services/contacts.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  loading!:boolean;
  contactUsPage:any;
  contactUsImage = `${environment.imageUrl}contact_us/`;

  constructor(
    private _ContactsService:ContactsService,
    private _Title:Title
  ) { }

  ngOnInit(): void {
    this.getContactPage();
    this._Title.setTitle(`${environment.title}Contact us`)
  }
  getContactPage(){
    this.loading = true;
    this._ContactsService.getContactData().subscribe(
      (response) => {
        this.contactUsPage = response.rows;
        this.loading = false;
      }
    )
  }
}
