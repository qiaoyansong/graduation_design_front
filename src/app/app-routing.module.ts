import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';
import { TinyEditorComponent } from './tiny-editor/tiny-editor.component';


const routes: Routes = [
  {path: 'tinyEditor', component: TinyEditorComponent},
  {path: '',   redirectTo: '/tinyEditor', pathMatch: 'full'},
  {path: 'caroul', component: CarouselComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
