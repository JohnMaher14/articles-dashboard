import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ContactsService } from 'src/app/services/contacts.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-contact-us',
  templateUrl: './edit-contact-us.component.html',
  styleUrls: ['./edit-contact-us.component.scss']
})
export class EditContactUsComponent implements OnInit {

  error:string = '';
  success:string = '';
  shortLink: string = "";
  aboutusEdit!:FormGroup;
  contactUsData:any;
  loading!:boolean;
  aboutLink= `${environment.imageUrl}contact_us_page/`;

  constructor(
    private _ContactsService:ContactsService,
    private _Title:Title,
    private _Router:Router
  ) {
  }
  contactUsEdit:FormGroup = new FormGroup({
    email: new FormControl('',  Validators.required),
    location: new FormControl('',  Validators.required),
    address: new FormControl('',  Validators.required),
    phone: new FormControl('',  Validators.required),
    facebook: new FormControl('',  Validators.required),
    twitter: new FormControl('',  Validators.required),
    instagram: new FormControl('',  Validators.required),
    map_link: new FormControl('',  Validators.required),
    banner_image: new FormControl(null),
  })
  aboutUsFormData(){
    this.loading = true
    this._ContactsService.getContactData().subscribe(
      (response) => {
        console.log(response);
        this.contactUsData = response.rows
        this.loading = false

      }
    )
  }
  ngOnInit(): void {
    this.aboutUsFormData()
    this._Title.setTitle(`Digital bond | About us edit`)

  }

  banner_image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.contactUsEdit.patchValue({
      banner_image: file
    })
    this.aboutusEdit.get('banner_image')?.updateValueAndValidity()
  }


  onSubmit(){
    this._ContactsService.updateContactData(
      this.contactUsEdit.value.email,
      this.contactUsEdit.value.location,
      this.contactUsEdit.value.address,
      this.contactUsEdit.value.phone,
      this.contactUsEdit.value.facebook,
      this.contactUsEdit.value.twitter,
      this.contactUsEdit.value.instagram,
      this.contactUsEdit.value.map_link,
      this.contactUsEdit.value.banner_image
    ).subscribe(
      (response) => {
            this.success = response.body.success
            setTimeout(() => {
              this._Router.navigate(['/contact-us']);
            }, 2000);
            console.log(response);
      }, error => {
          this.error = error.error.error
          console.log(error);
      }
    )

  }

}
