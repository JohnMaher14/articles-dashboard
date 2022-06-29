import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AboutService } from 'src/app/services/about.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.scss']
})
export class EditAboutComponent implements OnInit {
  error:string = '';
  success:string = '';
  shortLink: string = "";
  aboutusEdit!:FormGroup;
  aboutUsData:any;
  aboutLink= `${environment.imageUrl}about_us_page/`;

  constructor(
    private _AboutService:AboutService,
    private _FormBuilder:FormBuilder,
    private _Title:Title,
    private _Router:Router
  ) {
    this.aboutusEdit = this._FormBuilder.group({
      about_section_title: [''],
      about_section_text: [''],
      first_media_title: [''],
      first_media_text: [''],
      second_media_title: [''],
      second_media_text: [''],
      third_media_title: [''],
      third_media_text: [''],
      according_first_title: [''],
      according_first_text: [''],
      according_second_title: [''],
      according_second_text: [''],
      according_third_title: [''],
      according_third_text: [''],
      according_fourth_title: [''],
      according_fourth_text: [''],
      according_fivth_title: [''],
      according_fivth_text: [''],
      according_image: [null],
      about_banner_image: [null],
      about_section_image: [null]
    })
  }
  aboutUsFormData(){
    this._AboutService.getAboutUsTable().subscribe(
      (response) => {
        this.aboutUsData = response.rows
      }
    )
  }
  ngOnInit(): void {
    this.aboutUsFormData()
    this._Title.setTitle(`Digital bond | About us edit`)

  }
  about_banner_image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.aboutusEdit.patchValue({
      about_banner_image: file
    })
    this.aboutusEdit.get('about_banner_image')?.updateValueAndValidity()
  }
  about_section_image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.aboutusEdit.patchValue({
      about_section_image: file
    })
    this.aboutusEdit.get('about_section_image')?.updateValueAndValidity()
  }
  according_image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.aboutusEdit.patchValue({
      according_image: file
    })
    this.aboutusEdit.get('according_image')?.updateValueAndValidity()
  }


  onSubmit(){
    this._AboutService.UpdateAboutUs(
      this.aboutusEdit.value.about_section_title,
      this.aboutusEdit.value.about_section_text,
      this.aboutusEdit.value.first_media_title,
      this.aboutusEdit.value.first_media_text,
      this.aboutusEdit.value.second_media_title,
      this.aboutusEdit.value.second_media_text,
      this.aboutusEdit.value.third_media_title,
      this.aboutusEdit.value.third_media_text,
      this.aboutusEdit.value.according_first_title,
      this.aboutusEdit.value.according_first_text,
      this.aboutusEdit.value.according_second_title,
      this.aboutusEdit.value.according_second_text,
      this.aboutusEdit.value.according_third_title,
      this.aboutusEdit.value.according_third_text,
      this.aboutusEdit.value.according_fourth_title,
      this.aboutusEdit.value.according_fourth_text,
      this.aboutusEdit.value.according_fivth_title,
      this.aboutusEdit.value.according_fivth_text,
      this.aboutusEdit.value.according_image,
      this.aboutusEdit.value.about_banner_image,
      this.aboutusEdit.value.about_section_image,
    ).subscribe(
      (response) => {
            this.success = response.body.success
            setTimeout(() => {
              this._Router.navigate(['/about-us']);
            }, 2000);
      }, error => {
          this.error = error.error.error
          console.log(error);
      }
    )

  }
}
