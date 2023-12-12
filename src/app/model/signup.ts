import {PasswordRequest} from "./password";

export interface SignupRequest{
  username: string;
  email: string;
  passwordComponent: PasswordRequest;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: Date;
  address: string;
  userType: string;
}
