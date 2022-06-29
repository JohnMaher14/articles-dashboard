import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoryService } from 'src/app/services/category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  success: string = '';
  error: string = '';
  delete: string = '';
  loading: boolean = false;
  loadingAction: boolean = false;
    modalRef!: BsModalRef;
  categories: any[] = [];
  categoryImage:string = `${environment.imageUrl}Category/`;
  constructor(
    public _BsModalService:BsModalService,
    private _CategoryService:CategoryService,
    private _Title:Title

  ) {


   }
   showCategories(){
    this.loading = true;

    this._CategoryService.getAllCategory().subscribe(
      (response) => {
        this.categories = response.rows
        this.loading = false
      }
    )
   }
    // create movie
    openModal(template: any) {
      this.modalRef = this._BsModalService.show(template);
    }
  createCategory = new FormGroup({
    'title' : new FormControl('', Validators.required),
    'text' : new FormControl('', Validators.required),
    'category_status' : new FormControl('', Validators.required),
    'banner_image' : new FormControl(null, Validators.required),
  })



    // image onchange
    banner_image(event:any){
      const file = event.target.files ? event.target.files[0] : '';
      this.createCategory.patchValue({
        banner_image: file
      })
      this.createCategory.get('banner_image')?.updateValueAndValidity()
    }


  ngOnInit(): void {
    this.showCategories();
    this._Title.setTitle(`${environment.title}Categories`)
  }

  onCreateModal(){
    this.loadingAction = true;

    this._CategoryService.createCategory(
      this.createCategory.value.title,
      this.createCategory.value.text,
      this.createCategory.value.banner_image,
      this.createCategory.value.category_status,
      ).subscribe(
        (response) => {
          if(response.success){
            this.success = response.success;
            this._BsModalService.hide();
            this.showCategories();
            this.loadingAction = false;

          }
        }, error => {
          this.loadingAction = false;
          console.log(error);
        }
    )
  }
  onDelete(id:number , data:any){
    if(confirm(`Are you sure to disable category with id ${id}`)) {
      this.loadingAction = true;

    this._CategoryService.disableCategory(id,data ).subscribe(
      (response) => {
        if (response.success) {
          this.delete = response.success;
          setTimeout(() => {
            this.delete = '';
          }, 4500);
          this.error = '';
          this.success = '';
          this.loadingAction = false;

          this.showCategories();
        }

      })
    }
  }
  onEnable(id:number , data:any){
    if(confirm(`Are you sure to enable category with id ${id}`)) {
      this.loadingAction = true;

    this._CategoryService.enableCategory(id,data ).subscribe(
      (response) => {
        if (response.success) {
          this.delete = '';
          this.error = '';
          this.success = response.success;
          setTimeout(() => {
            this.success = '';
          }, 4500);
          this.loadingAction = false;

          this.showCategories();
        }
        // console.log(response);
      }
      )
    }
  }
}
