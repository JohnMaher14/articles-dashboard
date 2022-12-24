import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';
import { HomeService } from 'src/app/services/home.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  success: string = '';
  error: string = '';
  delete: string = '';
  modalRef!: BsModalRef;
  ckeditorContent!: string;
  articles: any[] =[];
  categories: any[] =[];
  loading: boolean = false;
  loadingAction: boolean = false;
  categoryImage:string = `${environment.imageUrl}Articles/`;
  searchWord:any;
  selectedList: any = [];
  currValue:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dateContainer = false;
  today: any;
  date = new DatePipe('en-US');
  bsRangeValue!: Date[];

  minDate!: Date;
    bsValue = new Date();

  maxDate!: Date;
  constructor(
    public _BsModalService:BsModalService,
    private _ArticleService:ArticleService,
    private _CategoryService:CategoryService,
    private _HomeService:HomeService,
    private _Title:Title
  ) {


  }

    // create movie
    openModal(template: any) {
      this.modalRef = this._BsModalService.show(template);
    }
  createArticle = new FormGroup({
    'name' : new FormControl('', Validators.required),
    'description' : new FormControl('', Validators.required),
    'trendy' : new FormControl('', Validators.required),
    'category_id' : new FormControl('', Validators.required),
    'image' : new FormControl(null, Validators.required),
  })


showCategories(){
  this.loading = true;
  this._CategoryService.getAllCategory().subscribe(
  (response) => {
    console.log(response);
    this.categories = response.rows;
    this.loading = false;


    }
  )
}

onChange(deviceValue:any) {
  this.dateContainer = true;
  this.loading = true
  this._ArticleService.getPostCategory(deviceValue.target.value).subscribe(
    (response) => {
      if(deviceValue.target.value === ''){
        this.showArticles();
      }
      // this.movies = response.message
      this.articles  = response.categoryData.post_re

      this.loading = false;

    })
}
  showArticles(){
    this.dateContainer = true;
    this.loading = true;
    this._ArticleService.getArticles().subscribe(
    (response) => {
      console.log(response);
      this.articles = response.row;
      this.loading = false;

    }
    )
  }

  // image onchange
  image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.createArticle.patchValue({
      image: file
    })
    this.createArticle.get('image')?.updateValueAndValidity()
  }
  ngOnInit(): void {
    this.showArticles();
    this.showCategories();
    this._Title.setTitle(`${environment.title}Articles`);
    this.today = this.date.transform(Date.now(), 'yyyy-MM-dd');

    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate());
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }
  onDelete(id:number , data:any){
    if(confirm(`Are you sure to disable article with id ${id}`)) {
      this.loadingAction = true;

    this._ArticleService.disableArticle(id,data ).subscribe(
      (response) => {
        if (response.success) {
          this.delete = response.success;
          setTimeout(() => {
            this.delete = '';
          }, 4500);
          this.error = '';
          this.success = '';
          this.loadingAction = false;

          this.showArticles();
        }

      })
    }
  }
  onEnable(id:number , data:any){
    if(confirm(`Are you sure to enable article with id ${id}`)) {
      this.loadingAction = true;

    this._ArticleService.enableArticle(id,data ).subscribe(
      (response) => {
        if (response.success) {
          this.delete = '';
          this.error = '';
          this.success = response.success;
          setTimeout(() => {
            this.success = '';
          }, 4500);
          this.loadingAction = false;

          this.showArticles();
        }
        // console.log(response);
      }
      )
    }
  }
  filter = new FormGroup({
    'date1' : new FormControl('' , Validators.required),
  })


  onSubmit(filter:FormGroup){
    this.dateContainer = false;

    this.loading = true
    this._HomeService.submitData(this.date.transform(filter.value.date1[0] , 'yyyy-MM-dd') , this.date.transform(filter.value.date1[1] , 'yyyy-MM-dd')).subscribe(
      (response) => {
        this.articles = response.posts
        this.loading = false;

      }
    )
  }
}
