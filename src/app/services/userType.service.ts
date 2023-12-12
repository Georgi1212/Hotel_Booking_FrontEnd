import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root',
})
export class UserTypeService {
  private selectedUserType: string = '';

  setSelectedUserType(userType: string) {
    this.selectedUserType = userType;
  }

  getSelectedUserType(): string {
    return this.selectedUserType;
  }
}
