import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './service/language.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'front';
  private language: string;
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
    this.language = this.languageService.getLanguage();
    // 表名用哪一个国家的
    this.translate.use(this.language);
  }
}
