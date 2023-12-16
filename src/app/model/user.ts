import {UserType} from "./userType";

export interface User{
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
  userType: string;
}
