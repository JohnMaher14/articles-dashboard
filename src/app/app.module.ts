import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { ModalModule } from "ngx-bootstrap/modal";
import { CKEditorModule } from "ckeditor4-angular";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// decalarations compnents
import { HomeComponent } from './content/pages/home/home.component';
import { NavbarComponent } from './content/shared/navbar/navbar.component';
import { SidebarComponent } from './content/shared/sidebar/sidebar.component';
import { FooterComponent } from './content/shared/footer/footer.component';
import { LoginComponent } from './content/auth/login/login.component';
import { NotfoundComponent } from './content/shared/notfound/notfound.component';
import { AboutComponent } from './content/pages/about/about.component';
import { CommentsComponent } from './content/pages/comments/comments.component';
import { ContactUsComponent } from './content/pages/contact-us/contact-us.component';
import { CategoryComponent } from './content/pages/category/category.component';
import { ArticlesComponent } from './content/pages/articles/articles.component';
import { LoaderComponent } from './content/shared/loader/loader.component';
import { ActionLoaderComponent } from './content/shared/action-loader/action-loader.component';
import { EditCategoryComponent } from './content/pages/category/edit-category/edit-category.component';
import { CreateArticleComponent } from './content/pages/articles/create-article/create-article.component';
import { EditArticleComponent } from './content/pages/articles/edit-article/edit-article.component';
import { EditCommentComponent } from './content/pages/comments/edit-comment/edit-comment.component';
import { GalleryComponent } from './content/pages/gallery/gallery.component';
import { EditGalleryComponent } from './content/pages/gallery/edit-gallery/edit-gallery.component';
import { EditAboutComponent } from './content/pages/about/edit-about/edit-about.component';
import { AuthComponent } from './content/auth/auth.component';
import { AdminsComponent } from './content/pages/admins/admins.component';
import { EditAdminComponent } from './content/pages/admins/edit-admin/edit-admin.component';
import { MessagesComponent } from './content/pages/messages/messages.component';
import { EditContactUsComponent } from './content/pages/contact-us/edit-contact-us/edit-contact-us.component';
import { StatisticsViewComponent } from './content/pages/statistics-view/statistics-view.component';
import { StatisticsArticlesComponent } from './content/pages/statistics-articles/statistics-articles.component';
import { FilterPipe } from './pipes/filter.pipe';

import { DataTablesModule } from "angular-datatables";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    NotfoundComponent,
    AboutComponent,
    CommentsComponent,
    ContactUsComponent,
    CategoryComponent,
    ArticlesComponent,
    LoaderComponent,
    ActionLoaderComponent,
    EditCategoryComponent,
    CreateArticleComponent,
    EditArticleComponent,
    EditCommentComponent,
    GalleryComponent,
    EditGalleryComponent,
    EditAboutComponent,
    AuthComponent,
    AdminsComponent,
    EditAdminComponent,
    MessagesComponent,
    EditContactUsComponent,
    StatisticsViewComponent,
    StatisticsArticlesComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CKEditorModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
