import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {
  constructor(private languageService: LanguageService, private translate: TranslateService) { }
  visible = false;
  language: string;
  ngOnInit(): void {
    this.language = this.languageService.getLanguage();
    this.translate.use(this.language);
  }
  public changeLanguage(value: string): void{
    this.languageService.setLanguage(value);
    this.language = value;
    this.translate.use(this.language);
  }
}
