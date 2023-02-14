import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILogin } from 'src/app/shared/interfaces/ILogin';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-cabinet-info',
  templateUrl: './cabinet-info.component.html',
  styleUrls: ['./cabinet-info.component.scss']
})
export class CabinetInfoComponent implements OnInit {
  public userUpdateForm!: FormGroup;
  public currentUser!: ILogin;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.initUserUpdateForm();
  }
  initUserUpdateForm(): void {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as string);    
    this.userUpdateForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      id: [null],
      role: [null],
      orders: [null],
      address: [null],
    });
    this.userUpdateForm.patchValue({
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName,
      phoneNumber: this.currentUser.phoneNumber,
      email: this.currentUser.email,
      id: this.currentUser.id,
      role: this.currentUser.role,
      orders: this.currentUser.orders,
      address: this.currentUser.address,
    })
  }
  updateUser(): void {
    localStorage.setItem("currentUser", JSON.stringify(this.userUpdateForm.value));
    this.accountService.update(this.userUpdateForm.value, this.currentUser.id).subscribe(() => {
      this.initUserUpdateForm();
    })
  };
}
