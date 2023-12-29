import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, FormGroup} from "@angular/forms";
import {BookingService} from "../services/booking-service";
import {BookingRowUser} from "../model/booking-row-user";
import {ConfirmDialogDeleteComponent} from "../confirm-dialog-delete/confirm-dialog-delete.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-view-bookings-user',
  templateUrl: './view-bookings-user.component.html',
  styleUrl: './view-bookings-user.component.css'
})
export class ViewBookingsUserComponent implements OnInit{
  email!: string

  dataSource = new MatTableDataSource<BookingRowUser>();
  displayedColumns: string[] = ['bookingId', 'hostFirstName', 'hostLastName', 'hostPhoneNumber', 'hotelName', 'hotelStreet', 'hotelCity', 'hotelCountry', 'check_in', 'check_out', 'sumPrice', 'createdAt', 'cancelBooking'];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(private bookingService: BookingService,
              private dialog: MatDialog) {}

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

  cancelBooking(bookingId: number){
    const dialogRef = this.dialog.open(ConfirmDialogDeleteComponent, {
      data: {
        title: 'Confirm deletion',
        message: 'Are you sure you want to delete (cancel) this booking?'
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // User clicked 'Delete', perform deletion logic here
        this.performCancellingBooking(bookingId);
      }
    });
  }

  performCancellingBooking(bookingId: number){
    this.bookingService.deleteBooking(bookingId).subscribe({
      next: () => {
        console.log('Booking cancelled successfully.');

        setTimeout(() => {
          location.reload();
        }, 2000);
      },
      error: (error: any) => {
        console.error('Error cancelling the booking: ', error);
      }
    })
  }
}
