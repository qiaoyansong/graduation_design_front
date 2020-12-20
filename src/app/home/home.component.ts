import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
