import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {HotelService} from "../services/hotel-service";
import {RoomService} from "../services/room-service";
import {AddPhotosRoomComponent} from "../add-photos-room/add-photos-room.component";
import {MatDialog} from "@angular/material/dialog";
import {AddPhotoHotelComponent} from "../add-photo-hotel/add-photo-hotel.component";
import {Hotel} from "../model/hotel";
import {UpdateRoomComponent} from "../update-room/update-room.component";
import {Room} from "../model/room";
import {ConfirmDialogDeleteComponent} from "../confirm-dialog-delete/confirm-dialog-delete.component";
import {UpdateHotelComponent} from "../update-hotel/update-hotel.component";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {
  hostEmail!: string;
  hotels: any[] = [];

  hotel_info!: Hotel;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private hotelService: HotelService,
              private roomService: RoomService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.hostEmail = localStorage.getItem('email') || '';

    this.hotelService.getHotelsByEmail(this.hostEmail).subscribe({
      next: (data) => {
        this.hotels = data.map((hotel: { hotelImageUrl: any; }) => {
          return {
            ...hotel,
            hotelImageUrl: this.transform(hotel.hotelImageUrl),
          };
        })
      },
      error: (error) => {
        console.error('Error fetching available hotels: ', error);
      }
    });
  }

  private transform(image: string) {
    return 'data:image/png;base64,' + image;
  }

  viewHotelRooms(hotelId: number) {
    this.router.navigate([`/admin-panel/hotel-rooms-details/${hotelId}`]).then(r => r);
  }

  toProfile() {
    this.router.navigate(['profile']).then(r => r);
  }

  logOut() {
    this.authService.logout();
  }

  addHotel() {
    this.router.navigate([`/newHotel`]).then(r => r);
  }

  updateHotelImage(hotelId: number) {
    this.openAddPhotoDialog(hotelId);
  }

  openAddPhotoDialog(hotelId: number) {
    const dialogRef = this.dialog.open(AddPhotoHotelComponent, {
      data: {
        hotelId: hotelId
      }
    });
  }

  updateHotel(hotelId: number){
    this.hotelService.getHotelByHotelId(hotelId).subscribe({
      next:(value) => {
        this.hotel_info = value;

        const dialogRef = this.dialog.open(UpdateHotelComponent, {
          data: { hotelId: hotelId, hotel: this.hotel_info }
        });

        dialogRef.componentInstance.hotel_emit.subscribe((object: Hotel) =>{
          this.hotel_info = object;
          this.dialog.closeAll();
        })
      },
      error: (error) => {
        console.log('Error getting user: ', error);
      }
    });

    console.log(this.hotel_info);
  }

  deleteHotel(hotelId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogDeleteComponent, {
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this hotel?'
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // User clicked 'Delete', perform deletion logic here
        this.performHotelDeletion(hotelId);
      }
    });
  }

  performHotelDeletion(hotelId:number) {
    this.hotelService.deleteHotel(hotelId).subscribe({
      next: () => {
        console.log('Hotel deleted successfully.');
      },
      error: (error) => {
        console.error('Error deleting the hotel: ', error);
      }
    });
  }
}
