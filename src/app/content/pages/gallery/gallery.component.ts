import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GalleryService } from 'src/app/services/gallery.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  success: string = '';
  error: string = '';
  delete: string = '';
  loading: boolean = false;
  loadingAction: boolean = false;
    modalRef!: BsModalRef;
  indexForNumbers!:number;
  galleryImage:string = `${environment.imageUrl}gallery/`;

  galleries: any[]=[];
  constructor(
    private _GalleryService:GalleryService,
    private _ActivatedRoute:ActivatedRoute,
    public _BsModalService:BsModalService,
    private _Title:Title
  ) { }
  showGallery(){
    this.indexForNumbers = this._ActivatedRoute.snapshot.params["id"];
    this.loading = true;

    this._GalleryService.getAllGallery(this.indexForNumbers).subscribe(
      (response) => {
        this.galleries = response.images
        this.loading = false
      }
    )
  }
  createGallery = new FormGroup({
    'image' : new FormControl(null, Validators.required),
  })
  ngOnInit(): void {
    this.showGallery();
    this._Title.setTitle(`${environment.title}Gallery`)
  }
      // image onchange
      image(event:any){
        const file = event.target.files ? event.target.files[0] : '';
        this.createGallery.patchValue({
          image: file
        })
        this.createGallery.get('image')?.updateValueAndValidity()
      }
      // create movie
      openModal(template: any) {
        this.modalRef = this._BsModalService.show(template);
      }
  onDelete(id:number , data:any){
    if(confirm(`Are you sure to disable comment with id ${id}`)) {
      this.loadingAction = true;

    this._GalleryService.deleteGallery(id,data ).subscribe(
      (response) => {
        if (response.success) {
          this.delete = response.success;
          setTimeout(() => {
            this.delete = '';
          }, 4500);
          this.error = '';
          this.success = '';
          this.loadingAction = false;

          this.showGallery();
        }

      })
    }
  }

  onCreateModal(){
    this.loadingAction = true;

    this._GalleryService.createGallery(
      this.createGallery.value.image,
      this.indexForNumbers
      ).subscribe(
        (response) => {
          if(response.success){
            this.success = response.success;
            setTimeout(() => {
              this.success = '';
            }, 4500);
            this.error = '';
            this.delete = '';
            this._BsModalService.hide();
            this.showGallery();
            this.loadingAction = false;

          }
        }, error => {
          this.loadingAction = false;
          console.log(error);
        }
    )
  }
}
