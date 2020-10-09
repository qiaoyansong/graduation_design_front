import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
/**
 * 这是随便切换语言模块
 * 'zh' 代表 汉语 对应 xxx.zh.yaml
 * 'en' 代表 英语
 */
export class LanguageService {
  private language;
  constructor() {}
  public getLanguage(): string {
    return this.language == null ? 'zh' : this.language;
  }
  public setLanguage(language: string): void {
    this.language = language;
  }
}
