import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  error: string = '';
  success: string = '';
  categories: any[] =[];
  loading: boolean = false;
  loadingAction: boolean = false;
  ckeditorContent: any;
  ckeConfig:any;
  username:any;
  constructor(
    private _CategoryService:CategoryService,
    private _ArticleService:ArticleService,
    private _Router:Router
  ) { }
  createArticle = new FormGroup({
    'title' : new FormControl('', Validators.required),
    'trend_status' : new FormControl(''),
    'news_status' : new FormControl(''),
    'post_status' : new FormControl(''),
    'category_id' : new FormControl('', Validators.required),
    'main_image' : new FormControl(null, Validators.required),
    'text' : new FormControl('', Validators.required),

  })
  // image onchange
  main_image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.createArticle.patchValue({
      main_image: file
    })
    this.createArticle.get('main_image')?.updateValueAndValidity()
  }

  showCategories(){
    this._CategoryService.getAllCategory().subscribe(
      (response) => {
        this.categories = response.rows
      }
    )


  }

  onChangeNews(targetValue:any){
    if(targetValue.target.checked === true){
      this.createArticle.get('news_status')?.patchValue(1)
    }else if(targetValue.target.checked === false){
      this.createArticle.get('news_status')?.patchValue(0)

    }
    console.log(targetValue.target.checked);
  }
  onChangeTrend(targetValue:any){
    if(targetValue.target.checked === true){
      this.createArticle.get('trend_status')?.patchValue(1)
    }else if(targetValue.target.checked === false){
      this.createArticle.get('trend_status')?.patchValue(0)

    }
    console.log(targetValue.target.checked);
  }
  getUsername(){
    this.username = JSON.parse(
      localStorage.getItem('currentUsername') || '{}'
    );
  }
  onChangePost(targetValue:any){
    if(targetValue.target.checked === true){
      this.createArticle.get('post_status')?.patchValue(1)
    }else if(targetValue.target.checked === false){
      this.createArticle.get('post_status')?.patchValue(0)

    }
    console.log(targetValue.target.checked);
  }
  onCreateModal(createArticle:FormGroup){
    this.loadingAction = true;

    this._ArticleService.createArticle(
      this.createArticle.value.title,
      this.createArticle.value.text,
      this.createArticle.value.main_image,
      this.createArticle.value.category_id,
      this.createArticle.value.trend_status,
      this.createArticle.value.news_status,
      this.createArticle.value.post_status,
      this.username
      ).subscribe(
        (response) => {
          if(response.success){
            this.success = response.success;
            this.showCategories();
            setTimeout(() => {
              this._Router.navigate(['/articles']);
            }, 3000);
            this.loadingAction = false;

          }
        }, error => {
          this.loadingAction = false;
          console.log(error);
        }
    )

    console.log(createArticle.value);
  }
  ngOnInit(): void {
    this.showCategories();
    this.createArticle.get('trend_status')?.setValue(0)
    this.createArticle.get('news_status')?.setValue(0)
    this.createArticle.get('post_status')?.setValue(0)
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
