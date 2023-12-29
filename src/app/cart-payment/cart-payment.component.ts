import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {BookingService} from "../services/booking-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SucPaymentService} from "../services/suc-payment";


@Component({
  selector: 'app-cart-payment',
  templateUrl: './cart-payment.component.html',
  styleUrl: './cart-payment.component.css'
})
export class CartPaymentComponent implements OnInit {
  email!: string;
  hotelId!: number;
  roomId!: number;
  startDate!: Date;
  endDate!: Date;
  roomPrice!: number;
  sumPrice!:number;
  hotelName!: string;
  hotelCity!: string;
  hotelCountry!: string;

  paymentForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private bookingService: BookingService,
              private sucPayment: SucPaymentService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.hotelId = parseInt(params['hotelId'], 10);
    });

    this.route.params.subscribe((params) => {
      this.roomId = parseInt(params['roomId'], 10);
    });

    this.route.queryParams.subscribe((queryParams) => {
      this.startDate = queryParams['startDate'];
      this.endDate = queryParams['endDate'];
      this.email = queryParams['email'];
      this.roomPrice = queryParams['roomPrice'];
      this.hotelName = queryParams['hotelName'];
      this.hotelCity = queryParams['hotelCity'];
      this.hotelCountry = queryParams['hotelCountry'];
    });

    this.paymentForm = this.fb.group({
      price: [0, Validators.required],
      currency: ['', Validators.required],
      method: ['', Validators.required],
      intent: ['', Validators.required],
      description: ['', Validators.required],
    });

    const daysBetween = this.daysBetweenDates(this.startDate, this.endDate);
    this.sumPrice = daysBetween * this.roomPrice;

    this.sucPayment.hotelId = this.hotelId;
    this.sucPayment.roomId = this.roomId;
    this.sucPayment.check_in = this.bookingService.formatDate(this.startDate);
    this.sucPayment.check_out = this.bookingService.formatDate(this.endDate);

  }

  private daysBetweenDates(date1: Date, date2: Date): number {
    const newDate1 = new Date(date1);
    const newDate2 = new Date(date2);
    // Convert both dates to UTC to avoid timezone issues
    const utcDate1 = Date.UTC(newDate1.getFullYear(), newDate1.getMonth(), newDate1.getDate());
    const utcDate2 = Date.UTC(newDate2.getFullYear(), newDate2.getMonth(), newDate2.getDate());

    // Calculate the difference in milliseconds
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const timeDifference = utcDate2 - utcDate1;

    // Calculate the difference in days
    return Math.floor(timeDifference / millisecondsPerDay);
  }

  checkout(sumPrice:string){
    //const urlPayment = result from PayPalController /pay ??
    //window.location.href = 'urlPayment';
    this.bookingService.makePayment(sumPrice, this.hotelId, this.roomId,
      this.bookingService.formatDate(this.startDate),
      this.bookingService.formatDate(this.endDate)).subscribe((url: string) => {
      if(url != ""){
        window.location.href = url;
      }
    });

    //this.bookingService.completePayment()
  }
}
