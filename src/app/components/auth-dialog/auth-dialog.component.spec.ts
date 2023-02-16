import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDialogComponent } from './auth-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

describe('AuthDialogComponent', () => {
  let component: AuthDialogComponent;
  let fixture: ComponentFixture<AuthDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      declarations: [ AuthDialogComponent ],
      providers: [
      {provide: Auth, useValue: {}},
      {provide: Firestore, useValue: {}}
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
