import {Component, OnInit} from '@angular/core';
import {SucPaymentService} from "../services/suc-payment";
import {BookingService} from "../services/booking-service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-successful-payment',
  templateUrl: './successful-payment.component.html',
  styleUrl: './successful-payment.component.css'
})
export class SuccessfulPaymentComponent implements OnInit{
  user_email!: string;

  paymentId!:string;
  PayerID!:string

  infoMessage: string = '';

  hotelId!: number;
  roomId!: number;
  check_in!: string;
  check_out!: string;

  constructor(private sucPayment: SucPaymentService,
              private bookingService: BookingService,
              private router: Router,
              private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.user_email = localStorage.getItem('email') || '';

    this.route.queryParams.subscribe((queryParams) => {
      this.hotelId = queryParams['hotelId'];
      this.roomId = queryParams['roomId'];
      this.check_in = queryParams['check_in'];
      this.check_out = queryParams['check_out'];
      this.paymentId = queryParams['paymentId'];
      this.PayerID = queryParams['PayerID'];
    });

    this.bookingService.completePayment(this.paymentId, this.PayerID).subscribe((str: string) => {
      if(str === "success"){

        const toCreateBooking = {
          "hotelId": this.hotelId,
          "roomId": this.roomId,
          "check_in": this.check_in,
          "check_out": this.check_out
        }

        console.log(toCreateBooking);

        this.bookingService.addBooking(this.user_email, toCreateBooking).subscribe({
          next: (value) => {
            this.showInfo(value.message);
          },
          error: () => {
            console.log('An error occurred during the payment');
          }
        });
      }
    });
  }

  public showInfo(message:string): void {
    this.infoMessage = message;
  }

}
