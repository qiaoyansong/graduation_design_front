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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DevUIModule } from 'ng-devui';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BackTopComponent } from './back-top/back-top.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { MultiTranslateLoader } from './MultiTranslateLoader';
@NgModule({
  declarations: [
    AppComponent,
    TinyEditorComponent,
    BackTopComponent,
    CarouselComponent,
    BreadCrumbComponent,
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
    HttpClientModule,
    DevUIModule,
    NzIconModule,
    NzCarouselModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpYamlLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NzBreadCrumbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function HttpYamlLoaderFactory(http: HttpClient): MultiTranslateLoader {
  const localPath = 'assets/i18n/';
  const resources = [
    { prefix: `${localPath}label.`, suffix: '.yaml' },
    { prefix: `${localPath}message.`, suffix: '.yaml' },
  ];
  return new MultiTranslateLoader(http, resources);
}
