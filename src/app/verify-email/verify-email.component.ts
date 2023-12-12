import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Params} from "@angular/router";
import {VerifyService} from "../services/verify.service";

@Component({
  selector: 'app-verify-email',
  //standalone: true,
  //imports: [CommonModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent implements OnInit {

  message!: string;
  verifyCode!: string;

  constructor(private verifyService: VerifyService,
              private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.verifyCode = params['verifyCode']);
    this.verifyService.verifyEmail(this.verifyCode).subscribe({
      next: (value: { message: string; }) => {
        this.message = value.message;
      },
      error: (err: { message: string; }) => {
        this.message = err.message;
      }
    });
  }

}
