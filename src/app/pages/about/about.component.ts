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
      this.opened_first ? this.opened_first = false : this.opened_first = true;
    }
    else if (num == 'second') {
      this.opened_second ? this.opened_second = false : this.opened_second = true;
    }
    else if (num == 'third') {
      this.opened_third ? this.opened_third = false : this.opened_third = true;
    }
    else if (num == 'fourth') {
      this.opened_fourth ? this.opened_fourth = false : this.opened_fourth = true;
    }
  }
}