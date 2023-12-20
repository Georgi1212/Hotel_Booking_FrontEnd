import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {BookingRow} from "../model/booking-row";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {BookingService} from "../services/booking-service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-view-bookings-admin',
  templateUrl: './view-bookings-admin.component.html',
  styleUrl: './view-bookings-admin.component.css'
})
export class ViewBookingsAdminComponent implements OnInit{
  hotelId!: number;
  dataSource = new MatTableDataSource<BookingRow>();
  displayedColumns: string[] = ['bookingId', 'userEmail', 'userFirstName', 'userLastName', 'userPhoneNumber', 'roomId', 'roomPrice', 'check_in', 'check_out', 'sumPrice', 'createdAt'];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  selectedRoomId: string = '';

  constructor(private route: ActivatedRoute,
              private bookingService: BookingService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.hotelId = parseInt(params['hotelId'], 10);
    });

    this.loadBookings();
  }

  loadBookings() {
    // Make a request to get all bookings initially
    this.bookingService.getBookingsByHotelId(this.hotelId).subscribe((bookings: BookingRow[]) => {
      this.dataSource.data = bookings;
    });
  }

  onSubmitFilter() {
    const selectedStartDate = <Date>this.range.value.start ?? null;
    const selectedEndDate = <Date>this.range.value.end ?? null;
    const selectedRoomId = this.selectedRoomId;

    if((selectedStartDate == null && selectedEndDate == null) && selectedRoomId != ''){
      const roomId = parseInt(selectedRoomId);

      this.bookingService.getBookingsByHotelIdRoomId(this.hotelId, roomId).subscribe((bookings: BookingRow[]) => {
        this.dataSource.data = bookings;
      });
    }

    else if((selectedStartDate != null && selectedEndDate != null) && selectedRoomId == ''){

      this.bookingService.getBookingsByHotelIdForTimePeriod(this.hotelId, selectedStartDate, selectedEndDate).subscribe((bookings: BookingRow[]) => {
        this.dataSource.data = bookings;
      });
    }

    else if((selectedStartDate != null && selectedEndDate != null) && selectedRoomId != ''){
      const roomId = parseInt(selectedRoomId);

      this.bookingService.getBookingsByHotelIdRoomIdForTimePeriod(this.hotelId, roomId, selectedStartDate, selectedEndDate).subscribe((bookings: BookingRow[]) => {
        this.dataSource.data = bookings;
      })
    }
    else{
      this.dataSource.data = [];
    }

  }

  onRoomIdInputChange(roomId: string) {
    this.selectedRoomId = roomId;
  }

}
