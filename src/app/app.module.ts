import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TinyEditorComponent } from './tiny-editor/tiny-editor.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    TinyEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzButtonModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzBackTopModule,
    EditorModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
