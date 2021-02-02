import {Component, Input, OnInit} from '@angular/core';
import { timeInterval } from 'rxjs/operators';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  /**
   * 这是走马灯模块
   */
  @Input()
  public height: number;
  constructor() {
  }

  @Input()
  public array: any;

  ngOnInit(): void {
  }
}
