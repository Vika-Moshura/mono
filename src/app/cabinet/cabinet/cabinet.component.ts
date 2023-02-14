import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {
  constructor(
    private accountService: AccountService,
  ) { }

  ngOnInit(): void { }
  logOut(): void {
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
  }
}
