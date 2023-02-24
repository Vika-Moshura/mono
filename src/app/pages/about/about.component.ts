import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  opened_first = false;
  opened_second = false;
  opened_third = false;
  opened_fourth = false;

  constructor() { }

  ngOnInit(): void {
  }
  toggle(num: string): void {
    if (num == 'first') {
      this.opened_first = !this.opened_first;
    }
    else if (num == 'second') {
      this.opened_second = !this.opened_second;

    }
    else if (num == 'third') {
      this.opened_third = !this.opened_third;

    }
    else if (num == 'fourth') {
      this.opened_fourth = !this.opened_fourth;
    }
  }
}