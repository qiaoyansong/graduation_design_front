import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../service/language.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private languageService: LanguageService, private translate: TranslateService) { 
    this.translate.use('zh');
  }

  language: string;
  public array = ['http://localhost:8080/login/1.jpg',
  'http://localhost:8080/login/2.jpg',
  'http://localhost:8080/login/3.jpg'];
  ngOnInit(): void {
  }

  public changeLanguage(value: string): void {
    this.languageService.setLanguage(value);
    this.language = value;
    this.translate.use(this.language);
  }
}
