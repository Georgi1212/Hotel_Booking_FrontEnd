import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {BookingRow} from "../model/booking-row";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {BookingService} from "../services/booking-service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-bookings-admin',
  templateUrl: './view-bookings-admin.component.html',
  styleUrl: './view-bookings-admin.component.css'
})
export class ViewBookingsAdminComponent implements OnInit, AfterViewInit{
  hotelId!: number;
  dataSource = new MatTableDataSource<BookingRow>();
  displayedColumns: string[] = ['bookingId', 'userEmail', 'userFirstName', 'userLastName', 'userPhoneNumber', 'roomId', 'roomPrice', 'check_in', 'check_out', 'sumPrice', 'createdAt'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private route: ActivatedRoute,
              private bookingService: BookingService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.hotelId = parseInt(params['hotelId'], 10);
    });

    this.loadBookings();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadBookings() {
    // Make a request to get all bookings initially
    this.bookingService.getBookingsByHotelId(this.hotelId).subscribe((bookings: BookingRow[]) => {
      this.dataSource.data = bookings;
    });
  }

}
