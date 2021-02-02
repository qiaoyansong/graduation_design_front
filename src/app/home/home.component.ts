import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../service/language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // 搜索内容
  public searchValue: string;
  constructor(private languageService: LanguageService, private translate: TranslateService, 
    private router: Router) {
    this.translate.use('zh');
  }

  visible = false;
  language: string;

  ngOnInit(): void {
    this.language = this.languageService.getLanguage();
    this.translate.use(this.language);
  }

  public changeLanguage(value: string): void {
    this.languageService.setLanguage(value);
    this.language = value;
    this.translate.use(this.language);
  }
  public login(): void {
    // 设置login界面走马灯高度
    // 导航去login界面
    this.router.navigate(['/login']);
  }

  public register(): void {
    // 导航去register界面
    this.router.navigate(['/register']);
  }
  public search(): void {
    console.log('value' + this.searchValue);
  }
}
