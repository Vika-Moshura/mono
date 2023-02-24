import { TestBed } from '@angular/core/testing';
import { ROLE } from '../../constants/ROLE.enum';

import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let guard: AdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should test letting the admin to sing in', () => {
    let currentUser = {
      name: 'name',
      surname: 'surname',
      role: ROLE.ADMIN
    }
    window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
    expect(guard).toBeTruthy();
  })
});
