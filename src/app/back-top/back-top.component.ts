import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-back-top',
  templateUrl: './back-top.component.html',
  styleUrls: ['./back-top.component.scss']
})
export class BackTopComponent implements OnInit {
  /**
   *  这是返回顶部的模块
   */
  @Input()
  public height: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
