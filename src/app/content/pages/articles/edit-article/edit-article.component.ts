import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
  error: string = '';
  success: string = '';
  indexForNumbers!:number;
  ckeditorContent!: any;
  categories: any[] =[];
  ckeConfig:any;
  article:any;
  username:any;

  loading: boolean = false;
  loadingAction: boolean = false;
  constructor(
    private _CategoryService:CategoryService,
    private _ArticleService:ArticleService,
    private _ActivatedRoute:ActivatedRoute,
    private _Router: Router

  ) { }
  updateArticle = new FormGroup({
    'title' : new FormControl('', Validators.required),
    'trend_status' : new FormControl(''),
    'news_status' : new FormControl(''),
    'post_status' : new FormControl(''),
    'category_id' : new FormControl('', Validators.required),
    'main_image' : new FormControl(null, Validators.required),
    'text' : new FormControl('', Validators.required),

  })
  getDetails(){
    this.indexForNumbers = this._ActivatedRoute.snapshot.params["id"];

    this._ArticleService.getArticleDeatils(this.indexForNumbers).subscribe(
      (response) => {
        this.article = response.row
        console.log(response);
      }
    )
  }
  // image onchange
  main_image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.updateArticle.patchValue({
      main_image: file
    })
    this.updateArticle.get('main_image')?.updateValueAndValidity()
  }

  showCategories(){
    this._CategoryService.getAllCategory().subscribe(
      (response) => {
        this.categories = response.rows
      }
    )


  }

  onChangeTrend(targetValue:any){
    if(targetValue.target.checked === true){
      this.updateArticle.get('trend_status')?.patchValue(1)
    }else if(targetValue.target.checked === false){
      this.updateArticle.get('trend_status')?.patchValue(0)

    }
  }
  onChangePost(targetValue:any){
    if(targetValue.target.checked === true){
      this.updateArticle.get('post_status')?.patchValue(1)
    }else if(targetValue.target.checked === false){
      this.updateArticle.get('post_status')?.patchValue(0)

    }
  }
  getUsername(){
    this.username = JSON.parse(
      sessionStorage.getItem('currentUsername') || '{}'
    );
  }
  onUpdate(){
    this.loadingAction = true;

    this._ArticleService.updateArticle(
      this.indexForNumbers,
      this.updateArticle.value.title,
      this.updateArticle.value.text,
      this.updateArticle.value.main_image,
      this.updateArticle.value.category_id,
      this.updateArticle.value.trend_status,
      this.updateArticle.value.news_status,
      this.updateArticle.value.post_status,
      this.username
      ).subscribe(
        (response) => {
          if(response.success){
            this.success = response.success;
            this.showCategories();
            this.loadingAction = false;
            setTimeout(() => {
              this._Router.navigate(['/articles']);
            }, 3000);

          }
        }, error => {
          this.loadingAction = false;
          console.log(error);
        }
    )

  }

  ngOnInit(): void {
    this.showCategories();
    this.getDetails();
    this.updateArticle.get('trend_status')?.setValue(0)
    this.updateArticle.get('news_status')?.setValue(0)
    this.updateArticle.get('post_status')?.setValue(0)
    this.ckeConfig = {
      extraPlugins:
        "easyimage,dialogui,dialog,a11yhelp,about,basicstyles,bidi,blockquote,clipboard," +
        "button,panelbutton,panel,floatpanel,colorbutton,colordialog,menu," +
        "contextmenu,dialogadvtab,div,elementspath,enterkey,entities,popup," +
        "filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo," +
        "font,format,forms,horizontalrule,htmlwriter,iframe,image,indent," +
        "indentblock,indentlist,justify,link,list,liststyle,magicline," +
        "maximize,newpage,pagebreak,pastefromword,pastetext,preview,print," +
        "removeformat,resize,save,menubutton,scayt,selectall,showblocks," +
        "showborders,smiley,sourcearea,specialchar,stylescombo,tab,table," +
        "tabletools,templates,toolbar,undo,wsc,wysiwygarea"
    };
    this.getUsername();

  }

}
