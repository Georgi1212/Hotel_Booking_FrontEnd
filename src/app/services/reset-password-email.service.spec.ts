import { TestBed } from '@angular/core/testing';
import {ResetPasswordEmailService} from "./reset-password-email-service";

describe('ResetPasswordEmailServiceService', () => {
  let service: ResetPasswordEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetPasswordEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
