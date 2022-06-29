import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryService } from 'src/app/services/gallery.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-gallery',
  templateUrl: './edit-gallery.component.html',
  styleUrls: ['./edit-gallery.component.scss']
})
export class EditGalleryComponent implements OnInit {

  success: any = '';
  error: any = '';
  modal: any;
  gallery:any;
  indexForNumbers: any;
  loading: boolean = false;
  loadingAction: boolean = false;
  galleryImage:string = `${environment.imageUrl}gallery/`;

  constructor(
    private _GalleryService:GalleryService,
    private _ActivatedRoute:ActivatedRoute,
    private _Router:Router
  ) { }

  ngOnInit(): void {
    this.getDetails()
  }
  getDetails(){
    this.indexForNumbers = this._ActivatedRoute.snapshot.params["id"];
    this.loading = true;

    this._GalleryService.getGalleryDetails(this.indexForNumbers).subscribe(
      (response) => {
        this.gallery = response.row;
        this.loading = false
      }
    )
  }
  updateGallery = new FormGroup({
    'image' : new FormControl(null, Validators.required),
  })
    // image onchange

  // image onchange
  image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.updateGallery.patchValue({
      image: file
    })
    this.updateGallery.get('image')?.updateValueAndValidity()
  }


  onUpdate(){
    this.loadingAction = true;

    this._GalleryService.updateGallery(
      this.indexForNumbers,
      this.updateGallery.value.image,

    ).subscribe(
      (response) =>{
        if(response.success){

          this.success = response.success;
          this.error = '';
          this.loadingAction = false;
          setTimeout(() => {
            this._Router.navigate([`/gallery/${this.gallery.post_id}`]);
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
