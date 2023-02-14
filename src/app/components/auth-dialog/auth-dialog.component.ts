import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constants/ROLE.enum';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {
  public isRegistered = true;
  public authForm!: FormGroup;
  public registForm!: FormGroup;
  public loginSubscription!: Subscription;
  public checkPassword = false;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private auth: Auth,
    private afs: Firestore
  ) { }

  ngOnInit(): void {
    this.initAuthForm();
    this.initRegistForm();
  }
  changeLogin(): void {
    this.isRegistered = !this.isRegistered
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }

  initRegistForm(): void {
    this.registForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmedPassword: [null, Validators.required],
    })
  }

  loginUser(): void {
    const { email, password } = this.authForm.value;
    this.login(email, password).then(() => {
      console.log('user login');
    }).catch(e => {
      console.error(e.message);
    })
  }

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      this.accountService.isUserLogin$.next(true);
      if (user && user['role'] === ROLE.ADMIN) {
        this.router.navigate(['/admin'])
      }
      else if (user && user['role'] === ROLE.USER) {
        this.router.navigate(['/cabinet'])
      }
    }, e => {
      console.error(e);
    })
  }

  registerUser(): void {
    const { email, password, firstName, lastName, phoneNumber } = this.registForm.value;
    this.register(email, password, firstName, lastName, phoneNumber).then(() => {
      console.log('user created');
      this.isRegistered = !this.isRegistered;
      this.registForm.reset();
    }).catch(e => {
      console.error(e.message);
    })
  }

  async register(email: string, password: string, firstName: string, lastName: string, phoneNumber: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    console.log(credential);
    const user = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: credential.user.email,
      address: '',
      orders: [],
      role: 'USER'
    };
    setDoc(doc(this.afs, 'users', credential.user.uid), user);
  }

  checkConfirmedPassword(): void {
    this.checkPassword = this.password.value === this.confirmedPassword.value;
    if (this.password.value !== this.confirmedPassword.value) {
      this.registForm.controls['confirmedPassword'].setErrors({
        matchError: 'Password confirmation doesnt match'
      })
    }
  }
  get password(): AbstractControl {
    return this.registForm.controls['password']
  }
  get confirmedPassword(): AbstractControl {
    return this.registForm.controls['confirmedPassword']
  }
  checkVisibilityError(control: string, name: string): boolean | null {
    return this.registForm.controls[control].errors?.[name]
  }

}
