import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.scss']
})
export class EditAdminComponent implements OnInit {
  loading: boolean = false;
  loadingAction: boolean = false;
  success: any = '';
  error: any = '';
  indexForNumbers!:number;
  admin!:any;
  constructor(
    private _AdminService:AdminService,
    private _ActivatedRoute:ActivatedRoute,
    private _Router:Router
  ) { }
  updateAdmin = new FormGroup({
    'name' : new FormControl('', Validators.required),
    'role' : new FormControl('', Validators.required),
    'phone' : new FormControl('', Validators.required),
    'email' : new FormControl('', [Validators.required, Validators.email]),
  })
  ngOnInit(): void {
    this.getDetails()
  }
  getDetails(){
    this.indexForNumbers = this._ActivatedRoute.snapshot.params["id"];
    this.loading = true;
    this._AdminService.getAdminDetails(this.indexForNumbers).subscribe(
      (response) => {
        this.admin = response.user;
        this.loading = false;

      }
    )
  }
  onUpdate(){
    this.loadingAction = true;
    this._AdminService.updateAdmin(
      this.indexForNumbers  ,
      this.updateAdmin.value.name,
      this.updateAdmin.value.phone,
      this.updateAdmin.value.email,
      this.updateAdmin.value.role
      ).subscribe(
      (response) => {
        console.log(response);
        if (response.success) {
          this.success = response.success;
          this.loadingAction = false;

          setTimeout(() => {
            this._Router.navigate(['/admins']);
          }, 3000);
        }
      }, error => {
        this.loadingAction = false;

        console.log(error);
      }
    )
  }
}
