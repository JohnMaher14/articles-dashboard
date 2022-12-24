import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';
import { HomeService } from 'src/app/services/home.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-statistics-articles',
  templateUrl: './statistics-articles.component.html',
  styleUrls: ['./statistics-articles.component.scss']
})
export class StatisticsArticlesComponent implements OnInit {

  articles: any[] =[];
  categories: any[] =[];
  articlesSearch: any[] =[];
  categoriesSearch: any[] =[];
  articlesAll: any[] =[];
  categoriesAll: any[] =[];
  loading!:boolean;
  searchContainer!:boolean;
  today: any;
  statistics!:number;
  date = new DatePipe('en-US');
  bsRangeValue!: Date[];

  minDate!: Date;
    bsValue = new Date();

  maxDate!: Date;
  constructor(
    private _HomeService:HomeService,
    private _CategoryService:CategoryService,
    private _ArticleService:ArticleService,
    private _Title:Title
  ) { }
  filter = new FormGroup({
    'date1' : new FormControl('' , Validators.required),
  })
  statisticsData(){
    this.loading = true;
    this.searchContainer = true;
    this._ArticleService.getArticles().subscribe(
      (responseArticle) => {
        this.articlesAll = responseArticle.row

      }
    )
      this._CategoryService.getAllCategory().subscribe(
        (response) => {
          this.loading = false;
          this.categoriesAll = response.rows
        }
      )
      this.loading = true;
      this._HomeService.getStatistics().subscribe(
        (response) => {

          this.categories = response.categorys
          this.articles = response.categoryCount

          this.loading = false;

        }
      )
      this._HomeService.getGeneralStatistics().subscribe(
        (response) => {
          this.statistics = response.Posts
        }
      )

  }
  ngOnInit(): void {
    this.statisticsData();
    this._Title.setTitle(`${environment.title}Statistics`)

    this.today = this.date.transform(Date.now(), 'yyyy-MM-dd');
    console.log(this.today);
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate());
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }
  onSubmit(filter:FormGroup){
    this.searchContainer = false;

    this.loading = true
    this._HomeService.submitData(this.date.transform(filter.value.date1[0] , 'yyyy-MM-dd') , this.date.transform(filter.value.date1[1] , 'yyyy-MM-dd')).subscribe(
      (response) => {
        this.categoriesSearch = response.categorys
        this.articlesSearch = response.categoryCount
        this.loading = false;
        let countArray = response.categoryCount.reduce((acc:any, cur:any) => acc + Number(cur), 0)
        this.statistics = countArray;
      }
    )
  }
}
