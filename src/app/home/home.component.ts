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
  /**
   * 切换语言
   * @param value 语言种类
   */
  public changeLanguage(value: string): void {
    this.languageService.setLanguage(value);
    this.language = value;
    this.translate.use(this.language);
  }
  /**
   *  导航去login界面
   */
  public login(): void {
    this.router.navigate(['/login']);
  }

  /**
   * 导航去register界面
   */
  public register(): void {
    this.router.navigate(['/register']);
  }

  /**
   * 搜索框
   */
  public search(): void {
    console.log('value' + this.searchValue);
  }
}
