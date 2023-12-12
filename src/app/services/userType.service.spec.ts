import { TestBed } from '@angular/core/testing';

import { UserTypeService } from './userType.service';

describe('UserService', () => {
  let service: UserTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
