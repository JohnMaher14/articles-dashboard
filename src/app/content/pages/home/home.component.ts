import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';
import { CommentsService } from 'src/app/services/comments.service';
import { HomeService } from 'src/app/services/home.service';
import { environment } from 'src/environments/environment';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categoryLength!:number;
  articleLength!:number;
  statistics!:any;
  articles: any[] = [];
  username:any;
  loading:boolean= false;
  constructor(
    private _ArticleService:ArticleService,
    private _HomeService:HomeService,
    private _Title:Title
  ) { }
  showArticles(){
    this.loading = true;
    this._ArticleService.getArticles().subscribe(
      (response) => {
        console.log(response);
        const array = response.row.filter(
          (x:any)=> {
            return x.post_status != 0;
          }
        )
        this.articles = array;
      }
    )
  }

  showStatistics(){
    this.loading= true
    this._HomeService.getGeneralStatistics().subscribe(
      (response) => {
        this.statistics = response;
        this.loading= false

      }
    )
  }
  getUsername(){
    this.username = JSON.parse(
      localStorage.getItem('currentUsername') || '{}'
    );
  }
  ngOnInit(): void {
    this.getUsername();
    this.showArticles();
    this.showStatistics();
    this._Title.setTitle(`${environment.title}Home`)
  }

}
