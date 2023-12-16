import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../services/user.service";
import {User} from "../model/user";
import {UserData} from "../model/user-data";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{
  userForm!: FormGroup;
  user!:User;
  public error: boolean = false;
  public errorMessage: string = '';

  @Output() user_emit = new EventEmitter<any>();
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any,
              private fb: FormBuilder,
              private userService:UserService) {
  }

  ngOnInit(): void {
    this.user = this.dialogData.user;
    this.userForm = this.fb.group({
      username: [this.user.username],
      firstName: [this.user.firstName],
      lastName:[this.user.lastName],
      phoneNumber: [this.user.phoneNumber],
      dateOfBirth: [this.user.dateOfBirth],
      address:[this.user.address]
    })
  }

  private areDatesEqual(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  public showError(message:string): void {
    this.error = true;
    this.errorMessage = message;
  }

  public closeModal(): void {
    this.error = false;
    this.errorMessage = '';
  }
  updateUser() {
    const newUser: UserData = this.userForm.getRawValue();
    let formattedDate:string;
    type userJsonType = {[key: string] : string}
    const userJSON:userJsonType = { };

    if(!this.areDatesEqual(new Date(newUser.dateOfBirth), new Date(this.user.dateOfBirth)))
    {
      const year = newUser.dateOfBirth.getFullYear();
      const month = ('0' + (newUser.dateOfBirth.getMonth() + 1)).slice(-2);
      const day = ('0' + newUser.dateOfBirth.getDate()).slice(-2);

      formattedDate = `${year}-${month}-${day}`;
      userJSON["dateOfBirth"] = formattedDate;
    }
    else formattedDate = this.user.dateOfBirth.toLocaleString();

    if(newUser.username != this.user.username)
    {
      userJSON["username"] = newUser.username;
    }

    if(newUser.firstName != this.user.firstName)
    {
      userJSON["firstName"] = newUser.firstName;
    }
    if(newUser.lastName != this.user.lastName)
    {
      userJSON["lastName"] = newUser.lastName;
    }
    if(newUser.phoneNumber != this.user.phoneNumber)
    {
      userJSON["phoneNumber"] = newUser.phoneNumber;
    }
    if(newUser.address != this.user.address)
    {
      userJSON["address"] = newUser.address;
    }

    this.userService.updateUser(this.user.email, userJSON).subscribe({
      next: (value) => {
        console.log(value);
        this.user_emit.emit(value);
        this.userForm.reset();
      },
      error: (error) => {
        console.log(error);
        this.showError(error.error.Message);
      }
    })
  }

}
