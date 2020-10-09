import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  /**
   * 这是走马灯模块
   */
  constructor() {}
  public array = [1, 2, 3, 4];
  ngOnInit(): void {}
}
