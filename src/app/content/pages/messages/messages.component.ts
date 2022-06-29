import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ContactsService } from 'src/app/services/contacts.service';
import { HomeService } from 'src/app/services/home.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  success: string = '';
  error: string = '';
  delete: string = '';
  messages: any[] =[];
  modalRef!:BsModalRef;
  seeMore = false;
  pageName: string ='Messages';
  fullscreed: boolean = false;
  loading: boolean = false;
  loadingAction: boolean = false;
  page!:number;
  fullScreen(){
    this.fullscreed = !this.fullscreed
  }
  serviceImage ='https://digitalbondmena.com/services/'
  constructor(
    private _ContactsService:ContactsService,
    private _Title:Title,
  ) { }

  ngOnInit(): void {
    this.showServices()
    this._Title.setTitle(`${environment.title}Messages`)

  }




  showServices(){
    this.loading = true
    this._ContactsService.getClientMessages().subscribe(
      (response) => {
        this.messages = response.rows
        this.loading = false
      }
    )
  }

}
