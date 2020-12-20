import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnchorComponent } from './anchor/anchor.component';
import { CarouselComponent } from './carousel/carousel.component';
import { HomeComponent } from './home/home.component';
import { ResultFofComponent } from './result-page/result-fof/result-fof.component';
import { TinyEditorComponent } from './tiny-editor/tiny-editor.component';

const routes: Routes = [
  { path: 'tinyEditor', component: TinyEditorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'caroul', component: CarouselComponent },
  { path: 'anchor', component: AnchorComponent },
  { path: '**', component: ResultFofComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
