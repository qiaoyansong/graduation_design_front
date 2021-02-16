import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-tg',
  templateUrl: './user-tg.component.html',
  styleUrls: ['./user-tg.component.scss']
})
export class UserTgComponent implements OnInit {
  // 当前页数
  public pageIndex: number;
  // 当前数据条数
  public sizeTotal: number;
  // 结果链表升序、降序排序
  public listSortOrderBy = 'asc';
  // 查询数据
  public searchValue: '';
  constructor() {
    this.pageIndex = 1;
    this.sizeTotal = 500;
  }

  ngOnInit(): void {
  }

  /**
   * 改变链表排序方式
   */
  public changeOrder(value: string): void {
    this.listSortOrderBy = value;
    console.log(this.listSortOrderBy);
  }


  /**
   * 分页查询数据
   */
  public selectData(): void {
    console.log('查询数据');
  }
}
