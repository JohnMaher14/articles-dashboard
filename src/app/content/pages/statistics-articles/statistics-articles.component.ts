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
  date = new DatePipe('en-US');
  constructor(
    private _HomeService:HomeService,
    private _CategoryService:CategoryService,
    private _ArticleService:ArticleService,
    private _Title:Title
  ) { }
  filter = new FormGroup({
    'date1' : new FormControl('' , Validators.required),
    'date2' : new FormControl('' ,[ Validators.required ])
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

  }
  ngOnInit(): void {
    this.statisticsData();
    this._Title.setTitle(`${environment.title}Statistics`)

    this.today = this.date.transform(Date.now(), 'yyyy-MM-dd');
    console.log(this.today);
  }
  onSubmit(){
    this.searchContainer = false;

    this.loading = true
    this._HomeService.submitData(this.filter.value.date1 , this.filter.value.date2).subscribe(
      (response) => {
        this.categoriesSearch = response.categorys
        this.articlesSearch = response.categoryCount
        this.loading = false;

      }
    )
  }
}
