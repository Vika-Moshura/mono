import { TestBed } from '@angular/core/testing';
import { ROLE } from '../../constants/ROLE.enum';

import { UserGuard } from './user.guard';

describe('UserGuard', () => {
  let guard: UserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should test letting the admin to sing in', ()=>{
    let currentUser = {
      name: 'name',
      surname: 'surname',
      role:ROLE.USER
    }
    window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
    expect(guard).toBeTruthy();
  })
});
