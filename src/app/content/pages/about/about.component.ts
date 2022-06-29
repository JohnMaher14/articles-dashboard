import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AboutService } from 'src/app/services/about.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  AboutUs: any;
  aboutUsImage:string = 'https://digitalbondmena.com/aklny/about_us_page/';
  loading:boolean = false;
  constructor(
    private _AboutService:AboutService,
    private _Title:Title
  ) { }
  showAboutus(){
    this.loading =  true;
    this._AboutService.getAboutUsTable().subscribe(
      (response) => {
        this.AboutUs = response.rows;
        this.loading =  false;

      }
    )
  }
  ngOnInit(): void {
    this.showAboutus();
    this._Title.setTitle(`${environment.title}About`)
  }

}
