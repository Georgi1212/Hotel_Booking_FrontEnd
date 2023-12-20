import { Component } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {OccupancyService} from "../services/occupancy-service";
import {OccupancyRow} from "../model/occupancy-row";

@Component({
  selector: 'app-view-occupancies-admin',
  templateUrl: './view-occupancies-admin.component.html',
  styleUrl: './view-occupancies-admin.component.css'
})
export class ViewOccupanciesAdminComponent {
  hotelId!: number;
  dataSource = new MatTableDataSource<OccupancyRow>();
  displayedColumns: string[] = ['roomId', 'check_in', 'check_out'];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  selectedRoomId: string = '';

  constructor(private route: ActivatedRoute,
              private occupancyService: OccupancyService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.hotelId = parseInt(params['hotelId'], 10);
    });

    this.loadBookings();
  }

  loadBookings() {
    // Make a request to get all bookings initially
    this.occupancyService.getOccupanciesByHotelId(this.hotelId).subscribe((occupancyRows: OccupancyRow[]) => {
      this.dataSource.data = occupancyRows;
    });
  }

  onSubmitFilter() {
    const selectedStartDate = <Date>this.range.value.start ?? null;
    const selectedEndDate = <Date>this.range.value.end ?? null;
    const selectedRoomId = this.selectedRoomId;

    if((selectedStartDate == null && selectedEndDate == null) && selectedRoomId != ''){
      const roomId = parseInt(selectedRoomId);

      this.occupancyService.getOccupanciesByHotelIdRoomId(this.hotelId, roomId).subscribe((occupancyRows: OccupancyRow[]) => {
        this.dataSource.data = occupancyRows;
      });
    }

    else if((selectedStartDate != null && selectedEndDate != null) && selectedRoomId == ''){

      this.occupancyService.getOccupanciesByHotelIdTimePeriod(this.hotelId, selectedStartDate, selectedEndDate).subscribe((occupancyRows: OccupancyRow[]) => {
        this.dataSource.data = occupancyRows;
      });
    }

    else if((selectedStartDate != null && selectedEndDate != null) && selectedRoomId != ''){
      const roomId = parseInt(selectedRoomId);

      this.occupancyService.getOccupanciesByHotelIdRoomIdTimePeriod(this.hotelId, roomId, selectedStartDate, selectedEndDate).subscribe((occupancyRows: OccupancyRow[]) => {
        this.dataSource.data = occupancyRows;
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
