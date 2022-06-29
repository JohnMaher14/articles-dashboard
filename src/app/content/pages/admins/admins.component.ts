import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { max } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  success: string = '';
  error: string = '';
  delete: string = '';
  admins: any[] =[ ];
  modalRef!:BsModalRef;
  loading: boolean = false;
  loadingAction: boolean = false;
  constructor(
    private _AdminService:AdminService,
    private _BsModalService:BsModalService,
    private _Title:Title
  ) { }
  createAdmin = new FormGroup({
    'name' : new FormControl('', Validators.required),
    'role' : new FormControl('', Validators.required),
    'phone' : new FormControl('', [Validators.required ,Validators.pattern(/^((\\+91-?)|0)?[0-9]{10}$/)]),
    'email' : new FormControl('', [Validators.required, Validators.email]),
    'password' : new FormControl('', Validators.required),
  })
  showAdmins(){
    this.loading= true;
    this._AdminService.getAllAdmins().subscribe(
      (response) => {
        this.admins = response.rows;
        this.loading= false;

      }
    )
  }
    // create movie
    openModal(template: any) {
    this.modalRef = this._BsModalService.show(template);
  }
  onCreateModal(createAdmin:FormGroup){
    this.loadingAction = true;

    this._AdminService.createAdmin(createAdmin.value).subscribe(
        (response) => {
          if(response.success){
            this.loadingAction = false;
            this._BsModalService.hide();
            this.success = response.success;
            this.showAdmins();
            setTimeout(() => {
              this.success = '';
            }, 4500);
            this.delete = '';
            this.error = '';
          }
        }, error => {
          this.loadingAction = false;
          console.log(error);
        }
    )
  }
  onDelete(id:number , data:any){
    if(confirm(`Are you sure to delete admin with id ${id}`)) {
      this.loadingAction = true

    this._AdminService.deleteAdmin(id,data ).subscribe(
      (response) => {
        if (response.success) {
          this.delete = response.success;
          this.error = '';
          this.success = '';
          setTimeout(() => {
            this.delete = '';
          }, 4500);
          this.loadingAction = false;

          this.showAdmins();
        }
      }, error => {
        console.log(error);
      }
      )
    }
  }
  ngOnInit(): void {
    this.showAdmins();
    this._Title.setTitle(`${environment.title}Admins`)

  }

}
