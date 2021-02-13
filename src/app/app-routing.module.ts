import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AdminHomepageComponent } from './admin/admin-homepage/admin-homepage.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import {AnchorComponent} from './anchor/anchor.component';
import {CarouselComponent} from './carousel/carousel.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AdminIsLoginGuard } from './guard/adminIsLogin.guard';
import { IsLoginGuard } from './guard/isLogin.guard';
import {HomeComponent} from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PersonalComponent } from './personal/personal.component';
import { RegisterComponent } from './register/register.component';
import {ResultFofComponent} from './result-page/result-fof/result-fof.component';
import {TinyEditorComponent} from './tiny-editor/tiny-editor.component';

const routes: Routes = [
  {path: 'tinyEditor', component: TinyEditorComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'caroul', component: CarouselComponent},
  {path: 'anchor', component: AnchorComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'personal', component: PersonalComponent, canActivate: [IsLoginGuard]},
  {path: 'admin/homepage', component: AdminHomepageComponent, canActivate: [AdminIsLoginGuard]},
  {path: 'admin/login', component: AdminLoginComponent},
  {path: 'forgetpwd', component: ForgetPasswordComponent},
  {path: '**', component: ResultFofComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
