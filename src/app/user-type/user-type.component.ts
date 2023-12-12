import { Component } from '@angular/core';
import {UserType} from "../model/userType";
import {UserTypeService} from "../services/userType.service";

@Component({
  selector: 'app-user-type',
  //standalone: true,
  //imports: [CommonModule, AngularMaterialModule],
  templateUrl: './user-type.component.html',
  styleUrl: './user-type.component.css'
})
export class UserTypeComponent {
  userTypes: UserType[] = [
    {value: 'ADMIN', viewValue: 'ADMIN'},
    {value: 'USER', viewValue: 'USER'}
  ];

  constructor(private userTypeService: UserTypeService) {}

  onUserTypeSelected(userType: string) {
    this.userTypeService.setSelectedUserType(userType);
  }

}
