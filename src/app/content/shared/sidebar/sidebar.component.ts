import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  dropdown:boolean = false;
  constructor(private _Renderer2:Renderer2) { }
  closeSidebar(){
    this._Renderer2.removeClass(document.body,'close_icon');
  }
  ngOnInit(): void {
  }

}
