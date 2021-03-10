import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  // 下拉列表所选条目
  public select: number;

  // 是否内嵌菜单
  public isCollapsed = false;
  // 主题
  public theme = true;

  constructor() {
    this.select = 1;
  }

  ngOnInit(): void {
  }

  /**
   * 内嵌菜单切换按钮
   */
  public toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  /**
   * 根据下拉列表获取对应内容
   * @param value 下拉列表
   */
  public getInfo(value: number): void {
    this.select = value;
  }
}
