import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthDialogComponent } from 'src/app/components/auth-dialog/auth-dialog.component';
import { ROLE } from 'src/app/shared/constants/ROLE.enum';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  public authForm!: FormGroup;
  private loginSubscription!: Subscription

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private auth:Auth,
    private afs: Firestore,
  ) { }

  ngOnInit(): void {
    this.initAuthForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }
  loginUser(): void {
    const { email, password } = this.authForm.value;
    this.login(email, password).then(() => {
    }).catch(e=>{
      console.error(e);
    })
  }

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
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


}
