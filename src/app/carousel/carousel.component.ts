import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  /**
   * 这是走马灯模块
   */
  private language: string;
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
    this.language = this.languageService.getLanguage();
    // 表名用哪一个国家的
    this.translate.use(this.language);
  }
  public array = [1, 2, 3, 4];
  ngOnInit(): void {}
}
