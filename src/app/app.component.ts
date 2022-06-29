import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isLogined!:boolean;
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
      this._AuthService.autoLogout()
  }
}
