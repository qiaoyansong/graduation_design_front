import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss'],
})
export class BreadCrumbComponent implements OnInit {
  constructor() {
  }
  @Input()
  type: any
  ngOnInit(): void {
  }
}
