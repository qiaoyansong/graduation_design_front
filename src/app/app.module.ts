import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzBackTopModule} from 'ng-zorro-antd/back-top';
import {EditorModule} from '@tinymce/tinymce-angular';
import {TinyEditorComponent} from './tiny-editor/tiny-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {DevUIModule} from 'ng-devui';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {BackTopComponent} from './back-top/back-top.component';
import {CarouselComponent} from './carousel/carousel.component';
import {NzCarouselModule} from 'ng-zorro-antd/carousel';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {BreadCrumbComponent} from './bread-crumb/bread-crumb.component';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {MultiTranslateLoader} from './MultiTranslateLoader';
import {XAnchorModule} from '@ng-nest/ui/anchor';
import {AnchorComponent} from './anchor/anchor.component';
import {ResultFofComponent} from './result-page/result-fof/result-fof.component';
import {NzResultModule} from 'ng-zorro-antd/result';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {HomeComponent} from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { PersonalComponent } from './user/personal/personal.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminHomepageComponent } from './admin/admin-homepage/admin-homepage.component';
import { ForgetPasswordComponent } from './user/forget-password/forget-password.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { UploadNewsComponent } from './admin/news/upload-news/upload-news.component';
import { SeeNewsComponent } from './admin/news/see-news/see-news.component';
import { UploadActivityComponent } from './admin/activity/upload-activity/upload-activity.component';
import { SeeActivityComponent } from './admin/activity/see-activity/see-activity.component';
import { UploadAuctionComponent } from './admin/auction/upload-auction/upload-auction.component';
import { SeeAuctionComponent } from './admin/auction/see-auction/see-auction.component';
import { UploadCommodityComponent } from './admin/commodity/upload-commodity/upload-commodity.component';
import { SeeCommodityComponent } from './admin/commodity/see-commodity/see-commodity.component';
import { UserInfoComponent } from './admin/user/user-info/user-info.component';
import { UserTgComponent } from './admin/user/user-tg/user-tg.component';
import { UserSeekHelpComponent } from './admin/user/user-seek-help/user-seek-help.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NewsTypePipePipe } from './pipe/news-type-pipe.pipe';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { InfoComponent } from './user/info/info.component';
import { TgComponent } from './user/tg/tg.component';
import { SeekHelpComponent } from './user/seek-help/seek-help.component';
import { ModifyPasswordComponent } from './user/modify-password/modify-password.component';
import { ReceivingAddressComponent } from './user/receiving-address/receiving-address.component';
import { GoodsPurchasedComponent } from './user/goods-purchased/goods-purchased.component';
import { TgjdComponent } from './user/tgjd/tgjd.component';
import { NewsCheckPipePipe } from './pipe/news-check-pipe.pipe';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { LocationPipe } from './pipe/location.pipe';
import { NewsDetailComponent } from './admin/news/news-detail/news-detail.component';
import { SeekHelpJdComponent } from './user/seek-help-jd/seek-help-jd.component';
import { SeekHelpDetailComponent } from './user/seek-help-detail/seek-help-detail.component';
import { UserSeekHelpDetailComponent } from './admin/user/user-seek-help-detail/user-seek-help-detail.component';
import { NewsListComponent } from './news-list/news-list.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { AuctionListComponent } from './auction-list/auction-list.component';
import { CommodityListComponent } from './commodity-list/commodity-list.component';
@NgModule({
  declarations: [
    AppComponent,
    TinyEditorComponent,
    BackTopComponent,
    CarouselComponent,
    BreadCrumbComponent,
    AnchorComponent,
    ResultFofComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PersonalComponent,
    AdminLoginComponent,
    AdminHomepageComponent,
    ForgetPasswordComponent,
    UploadNewsComponent,
    SeeNewsComponent,
    UploadActivityComponent,
    SeeActivityComponent,
    UploadAuctionComponent,
    SeeAuctionComponent,
    UploadCommodityComponent,
    SeeCommodityComponent,
    UserInfoComponent,
    UserTgComponent,
    UserSeekHelpComponent,
    NewsTypePipePipe,
    InfoComponent,
    TgComponent,
    SeekHelpComponent,
    ModifyPasswordComponent,
    ReceivingAddressComponent,
    GoodsPurchasedComponent,
    TgjdComponent,
    NewsCheckPipePipe,
    LocationPipe,
    NewsDetailComponent,
    SeekHelpJdComponent,
    SeekHelpDetailComponent,
    UserSeekHelpDetailComponent,
    NewsListComponent,
    ActivityListComponent,
    AuctionListComponent,
    CommodityListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzButtonModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzBackTopModule,
    EditorModule,
    NzToolTipModule,
    NzDatePickerModule,
    NzCascaderModule,
    FormsModule,
    NzModalModule,
    NzFormModule,
    NzDividerModule,
    NzRateModule,
    NzPopconfirmModule,
    NzSliderModule,
    NzUploadModule,
    HttpClientModule,
    DevUIModule,
    NzBadgeModule,
    NzListModule,
    NzPaginationModule,
    NzIconModule,
    NzAlertModule,
    NzTableModule,
    NzCarouselModule,
    ReactiveFormsModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    NzMenuModule,
    NzStepsModule,
    NzAvatarModule,
    NzInputNumberModule,
    NzDropDownModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpYamlLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NzBreadCrumbModule,
    XAnchorModule,
    NzResultModule,
    NzSwitchModule
  ],
  providers: [NzMessageService],
  bootstrap: [AppComponent],
})
export class AppModule {
}

export function HttpYamlLoaderFactory(http: HttpClient): MultiTranslateLoader {
  const localPath = 'assets/i18n/';
  const resources = [
    {prefix: `${localPath}label.`, suffix: '.yaml'},
    {prefix: `${localPath}message.`, suffix: '.yaml'},
  ];
  return new MultiTranslateLoader(http, resources);
}
