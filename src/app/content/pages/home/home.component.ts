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
  commentLength!:number;
  articles: any[] = [];
  username:any
  constructor(
    private _CategoryService:CategoryService,
    private _ArticleService:ArticleService,
    private _CommentsService:CommentsService,
    private _HomeService:HomeService,
    private _Title:Title
  ) { }
  showCategories(){
    this._CategoryService.getAllCategory().subscribe(
      (response) => {
        this.categoryLength = response.rows.length;
      }
    )
  }
  showArticles(){
    this._ArticleService.getArticles().subscribe(
      (response) => {
        this.articleLength = response.row.length;
        this.articles = response.row;
      }
    )
  }
  showComments(){
    // this._CommentsService.getAllComments().subscribe(
    //   (response) => {
    //     this.commentLength = response.row.length;
    //   }
    // )
  }
  showStatistics(){
    this._HomeService.submitData(
      this.username.value,
      this.username.value
    ).subscribe(
      (response) => {
        this.categoryLength = response.comments;
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
    this.showCategories();
    this.showArticles();
    this.showComments();
    this.showStatistics();
    this._Title.setTitle(`${environment.title}Home`)
  }

}
