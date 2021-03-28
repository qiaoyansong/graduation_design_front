import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AdminHomepageComponent } from './admin/admin-homepage/admin-homepage.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import {AnchorComponent} from './anchor/anchor.component';
import {CarouselComponent} from './carousel/carousel.component';
import { ForgetPasswordComponent } from './user/forget-password/forget-password.component';
import { AdminIsLoginGuard } from './guard/adminIsLogin.guard';
import { IsLoginGuard } from './guard/isLogin.guard';
import { IsNotLoginGuard } from './guard/isNotLogin.guard';
import {HomeComponent} from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { PersonalComponent } from './user/personal/personal.component';
import { RegisterComponent } from './user/register/register.component';
import {ResultFofComponent} from './result-page/result-fof/result-fof.component';
import {TinyEditorComponent} from './tiny-editor/tiny-editor.component';
import { NewsDetailComponent } from './admin/news/news-detail/news-detail.component';
import { SeekHelpDetailComponent } from './user/seek-help-detail/seek-help-detail.component';
import { UserSeekHelpDetailComponent } from './admin/user/user-seek-help-detail/user-seek-help-detail.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { CommodityListComponent } from './commodity-list/commodity-list.component';
import { AuctionListComponent } from './auction-list/auction-list.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { NewsComponent } from './news/news/news.component';

const routes: Routes = [
  {path: 'tinyEditor', component: TinyEditorComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'caroul', component: CarouselComponent},
  {path: 'anchor', component: AnchorComponent},
  {path: 'login', component: LoginComponent, canActivate: [IsNotLoginGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'personal', component: PersonalComponent, canActivate: [IsLoginGuard]},
  {path: 'admin/homepage', component: AdminHomepageComponent, canActivate: [AdminIsLoginGuard]},
  {path: 'admin/login', component: AdminLoginComponent, canActivate: [IsNotLoginGuard]},
  {path: 'forgetpwd', component: ForgetPasswordComponent},
  {path: 'admin/newsDetail', component: NewsDetailComponent,  canActivate: [AdminIsLoginGuard]},
  {path: 'seekHelpDetail', component: SeekHelpDetailComponent,  canActivate: [IsLoginGuard]},
  {path: 'admin/seekHelpDetail', component: UserSeekHelpDetailComponent,  canActivate: [AdminIsLoginGuard]},
  {path: 'newsList', component: NewsListComponent},
  {path: 'news', component: NewsComponent},
  {path: 'auctionList', component: AuctionListComponent},
  {path: 'commodityList', component: CommodityListComponent},
  {path: 'activityList', component: ActivityListComponent},
  {path: '**', component: ResultFofComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
