import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommentsService } from 'src/app/services/comments.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  success: string = '';
  error: string = '';
  delete: string = '';
  loading: boolean = false;
  loadingAction: boolean = false;
    modalRef!: BsModalRef;
  indexForNumbers!:number;
  comments: any[]=[];
  constructor(
    private _CommentsService:CommentsService,
    private _ActivatedRoute:ActivatedRoute,
    public _BsModalService:BsModalService,
    private _Title:Title

  ) { }
  showComments(){
    this.indexForNumbers = this._ActivatedRoute.snapshot.params["id"];
    this._CommentsService.getAllComments(this.indexForNumbers).subscribe(
      (response) => {
        this.comments = response.comments
        console.log(response.comments);
      }
    )
  }
  createComment = new FormGroup({
    'title' : new FormControl('', Validators.required),
    'text' : new FormControl('', Validators.required),
    'comment_status' : new FormControl('', Validators.required),
  })
  ngOnInit(): void {
    this.showComments();
    this._Title.setTitle(`${environment.title}Messages`)
  }
      // create movie
      openModal(template: any) {
        this.modalRef = this._BsModalService.show(template);
      }
  onDelete(id:number , data:any){
    if(confirm(`Are you sure to disable comment with id ${id}`)) {
      this.loadingAction = true;

    this._CommentsService.disableComment(id,data ).subscribe(
      (response) => {
        if (response.success) {
          this.delete = response.success;
          this.error = '';
          this.success = '';
          this.loadingAction = false;

          this.showComments();
        }

      })
    }
  }
  onEnable(id:number , data:any){
    if(confirm(`Are you sure to enable comment with id ${id}`)) {
      this.loadingAction = true;

    this._CommentsService.enableComment(id,data ).subscribe(
      (response) => {
        if (response.success) {
          this.delete = '';
          this.error = '';
          this.success = response.success;
          this.loadingAction = false;

          this.showComments();
        }
        // console.log(response);
      }
      )
    }
  }
  onCreateModal(){
    this.loadingAction = true;

    this._CommentsService.createComment(
      this.createComment.value.title,
      this.createComment.value.text,
      this.indexForNumbers ,
      this.createComment.value.comment_status,
      ).subscribe(
        (response) => {
          if(response.success){
            this.success = response.success;
            this._BsModalService.hide();
            this.showComments();
            this.loadingAction = false;

          }
        }, error => {
          this.loadingAction = false;
          console.log(error);
        }
    )
  }
}
