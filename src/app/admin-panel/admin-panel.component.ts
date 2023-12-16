import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {HotelService} from "../services/hotel-service";
import {RoomService} from "../services/room-service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit{
  hostEmail!: string;
  hotels: any[] = [];

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private hotelService: HotelService,
              private roomService: RoomService) {}
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

  private transform(image: string){
    return 'data:image/png;base64,' + image;
  }

  viewHotelRooms(hotelId:number){
    this.router.navigate([`/admin-panel/hotel-rooms-details/${hotelId}`]).then(r=>r);
  }

  toProfile(){
    this.router.navigate(['profile']).then(r => r);
  }

  logOut() {
    this.authService.logout();
  }
}
