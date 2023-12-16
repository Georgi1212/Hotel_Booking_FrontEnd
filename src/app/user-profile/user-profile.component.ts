import {Component, OnInit} from '@angular/core';
import {User} from "../model/user";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {UpdateUserComponent} from "../update-user/update-user.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
  user_email!:string;
  user_info!:User;
  constructor(private userService: UserService,
              private dialog: MatDialog,
              private authService: AuthService,
              private router: Router)
  {}

  ngOnInit() {
    this.user_email = localStorage.getItem('email') || '';

    this.userService.getUserByEmail(this.user_email).subscribe({
      next: (value) => {
        this.user_info = value;
      },
      error: (error) => {
        console.log('Error getting user: ', error);
      }
    });

  }

  updateUser() {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      data: { user: this.user_info }
    });

    dialogRef.componentInstance.user_emit.subscribe((object: User) =>{
      this.user_info = object;
      this.dialog.closeAll();
    })
  }

  back(){
    const userType = this.userService.getUserType(this.user_email)
      .subscribe((userType) => {
        if(userType === 'USER'){
          this.router.navigate(['welcome-page']).then(r=>r);
        }
        else if(userType === 'ADMIN'){
          this.router.navigate(['admin-panel']).then(r=>r);
        }
      })
  }

  logOut() {
    this.authService.logout();
  }
}
