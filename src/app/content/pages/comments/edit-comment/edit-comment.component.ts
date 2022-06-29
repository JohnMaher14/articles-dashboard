import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit {


  success: any = '';
  error: any = '';
  modal: any;
  comment:any;
  indexForNumbers: any;
  loading: boolean = false;
  loadingAction: boolean = false;
  constructor(
    private _CommentsService:CommentsService,
    private _ActivatedRoute:ActivatedRoute,
    private _Router:Router
  ) { }

  ngOnInit(): void {
    this.getDetails()
  }
  getDetails(){
    this.indexForNumbers = this._ActivatedRoute.snapshot.params["id"];
    this.loading = true;

    this._CommentsService.getCommentDetails(this.indexForNumbers).subscribe(
      (response) => {
        this.comment = response.row;
        this.loading = false
      }
    )
  }
  updateComment = new FormGroup({
    'title' : new FormControl('', Validators.required),
    'text' : new FormControl('', Validators.required),
    'comment_status' : new FormControl('', Validators.required),
  })
    // image onchange




  onUpdate(){
    this.loadingAction = true;

    this._CommentsService.updateComment(
      this.indexForNumbers,
      this.updateComment.value.title,
      this.updateComment.value.text,
      this.updateComment.value.comment_status,
    ).subscribe(
      (response) =>{
        if(response.success){

          this.success = response.success;
          this.error = '';
          this.loadingAction = false;
          setTimeout(() => {
            this._Router.navigate([`/comments/${this.comment.post_id}`]);
          }, 3000);
        }
      }
      , error => {
        if (error.status === 422) {
          this.error = error.error.message
          this.loadingAction = false;

        }
      }
    )
  }

}
