import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {


  success: any = '';
  error: any = '';
  modal: any;
  category:any;
  indexForNumbers: any;
  categoryImage = `${environment.imageUrl}Category/`;

  constructor(
    private _CategoryService:CategoryService,
    private _ActivatedRoute:ActivatedRoute,
    private _Router:Router
  ) { }

  ngOnInit(): void {
    this.getDetails()
  }
  getDetails(){
    this.indexForNumbers = this._ActivatedRoute.snapshot.params["id"];

    this._CategoryService.getCategoryDetails(this.indexForNumbers).subscribe(
      (response) => {
        this.category = response.Category
      }
    )
  }
  updateCategory = new FormGroup({
    'title' : new FormControl('', Validators.required),
    'text' : new FormControl('', Validators.required),
    'category_status' : new FormControl('', Validators.required),
    'banner_image' : new FormControl(null, Validators.required),
  })
    // image onchange
    banner_image(event:any){
      const file = event.target.files ? event.target.files[0] : '';
      this.updateCategory.patchValue({
        banner_image: file
      })
      this.updateCategory.get('banner_image')?.updateValueAndValidity()
    }




  onUpdate(){
    this._CategoryService.updateCategory(
      this.indexForNumbers,
      this.updateCategory.value.title,
      this.updateCategory.value.text,
      this.updateCategory.value.banner_image,
      this.updateCategory.value.category_status,
    ).subscribe(
      (response) =>{
        if(response.success){
          this.success = response.success
          this.error = ''
          setTimeout(() => {
            this._Router.navigate(['/categories']);
          }, 3000);
        }
      }
      , error => {
        if (error.status === 422) {
          this.error = error.error.message
        }
      }
    )
  }


}
