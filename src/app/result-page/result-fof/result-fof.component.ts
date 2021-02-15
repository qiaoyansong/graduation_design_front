import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

/**
 * 404界面
 *
 */
@Component({
  selector: 'app-result-fof',
  templateUrl: './result-fof.component.html',
  styleUrls: ['./result-fof.component.scss'],
})
export class ResultFofComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  /**
   * 返回首页
   */
  public goHome() {
    this.router.navigate(['']);
  }
}
