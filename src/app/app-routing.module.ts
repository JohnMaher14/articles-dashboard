import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './content/auth/auth.component';
import { AboutComponent } from './content/pages/about/about.component';
import { EditAboutComponent } from './content/pages/about/edit-about/edit-about.component';
import { AdminsComponent } from './content/pages/admins/admins.component';
import { EditAdminComponent } from './content/pages/admins/edit-admin/edit-admin.component';
import { ArticlesComponent } from './content/pages/articles/articles.component';
import { CreateArticleComponent } from './content/pages/articles/create-article/create-article.component';
import { EditArticleComponent } from './content/pages/articles/edit-article/edit-article.component';
import { CategoryComponent } from './content/pages/category/category.component';
import { EditCategoryComponent } from './content/pages/category/edit-category/edit-category.component';
import { CommentsComponent } from './content/pages/comments/comments.component';
import { EditCommentComponent } from './content/pages/comments/edit-comment/edit-comment.component';
import { ContactUsComponent } from './content/pages/contact-us/contact-us.component';
import { EditContactUsComponent } from './content/pages/contact-us/edit-contact-us/edit-contact-us.component';
import { EditGalleryComponent } from './content/pages/gallery/edit-gallery/edit-gallery.component';
import { GalleryComponent } from './content/pages/gallery/gallery.component';
import { HomeComponent } from './content/pages/home/home.component';
import { MessagesComponent } from './content/pages/messages/messages.component';
import { StatisticsArticlesComponent } from './content/pages/statistics-articles/statistics-articles.component';
import { StatisticsViewComponent } from './content/pages/statistics-view/statistics-view.component';
import { NotfoundComponent } from './content/shared/notfound/notfound.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:'' , redirectTo:'home' ,  pathMatch:'full'},
  {path:'home', canActivate:[AuthGuard] , component: HomeComponent},
  {path:'about-us', canActivate:[AuthGuard] , component: AboutComponent},
  {path:'about-us/edit/1', canActivate:[AuthGuard] , component: EditAboutComponent},
  {path:'articles', canActivate:[AuthGuard] , component: ArticlesComponent},
  {path:'create-article', canActivate:[AuthGuard] , component: CreateArticleComponent},
  {path:'edit-article/:id', canActivate:[AuthGuard] , component: EditArticleComponent},
  {path:'categories', canActivate:[AuthGuard] , component: CategoryComponent},
  {path:'category/:id' , component: EditCategoryComponent},
  {path:'contact-us', canActivate:[AuthGuard] , component: ContactUsComponent},
  {path:'contact-us/edit/1', canActivate:[AuthGuard] , component: EditContactUsComponent},
  {path:'comments/:id', canActivate:[AuthGuard] , component: CommentsComponent},
  {path:'comments/edit/:id', canActivate:[AuthGuard] , component: EditCommentComponent},
  {path:'gallery/:id', canActivate:[AuthGuard] , component: GalleryComponent},
  {path:'gallery/edit/:id', canActivate:[AuthGuard] , component: EditGalleryComponent},
  {path:'statistics-articles', canActivate:[AuthGuard] , component: StatisticsArticlesComponent},
  {path:'statistics-views', canActivate:[AuthGuard] , component: StatisticsViewComponent},
  {path:'admins', canActivate:[AuthGuard] , component: AdminsComponent},
  {path:'admin/:id', canActivate:[AuthGuard] , component: EditAdminComponent},
  {path:'messages', canActivate:[AuthGuard] , component: MessagesComponent},

  {path:'auth' , component: AuthComponent},
  {path:'**' , component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
