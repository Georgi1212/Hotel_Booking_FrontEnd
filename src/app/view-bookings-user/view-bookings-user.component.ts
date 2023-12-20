import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, FormGroup} from "@angular/forms";
import {BookingService} from "../services/booking-service";
import {BookingRowUser} from "../model/booking-row-user";

@Component({
  selector: 'app-view-bookings-user',
  templateUrl: './view-bookings-user.component.html',
  styleUrl: './view-bookings-user.component.css'
})
export class ViewBookingsUserComponent implements OnInit{
  email!: string

  dataSource = new MatTableDataSource<BookingRowUser>();
  displayedColumns: string[] = ['bookingId', 'hostFirstName', 'hostLastName', 'hostPhoneNumber', 'hotelName', 'hotelStreet', 'hotelCity', 'hotelCountry', 'check_in', 'check_out', 'sumPrice', 'createdAt'];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';

    this.loadBookings();
  }

  loadBookings() {
    // Make a request to get all bookings initially
    this.bookingService.getBookingsByEmail(this.email).subscribe((bookings: BookingRowUser[]) => {
      this.dataSource.data = bookings;
    });
  }
}
