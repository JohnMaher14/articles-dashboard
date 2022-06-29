import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isLogined!:boolean;
  constructor(
    private _AuthService:AuthService
  ){
  }
  getCurrentUserData(){

    this._AuthService.currentUserData.subscribe(()=>{
      if (this._AuthService.currentUserData.getValue() == null) {
        this.isLogined = false;

      }
      else{
        this.isLogined = true;
      }
    })
  }
  ngOnInit(): void {
      this.getCurrentUserData()
  }

}
