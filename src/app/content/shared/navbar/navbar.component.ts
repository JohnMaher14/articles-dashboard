import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogined!:boolean;
  username: any;
  isCollapsed:boolean = false;

  constructor(
    private _AuthService:AuthService,
    private _Renderer2:Renderer2
  ) { }
  signOut() {
    this._AuthService.signOut();
  }
  openMenu(){
    this._Renderer2.addClass(document.body,'close_icon')

  }
  openSidebar(){
    this._Renderer2.addClass(document.body,'close_icon');
    this.isCollapsed = true

  }
  collpaseSidebar(){
    this._Renderer2.removeClass(document.body,'close_icon');
    this.isCollapsed = false

  }

  authentication(){
    this._AuthService.currentUserData.subscribe(() => {
      if (this._AuthService.currentUserData.getValue() == null) {
        this.isLogined = false;
      } else {
        this.username = JSON.parse(
          sessionStorage.getItem('currentUsername') || '{}'
        );
        this.isLogined = true;
      }
    });
  }
  ngOnInit(): void {
    this.authentication();
  }

}
