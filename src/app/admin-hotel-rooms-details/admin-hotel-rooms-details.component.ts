import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {HotelService} from "../services/hotel-service";
import {RoomService} from "../services/room-service";
import {RoomWithId} from "../model/roomWithID";
import {RoomImage} from "../model/roomImage";
import {Hotel} from "../model/hotel";
import {forkJoin} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AddPhotosRoomComponent} from "../add-photos-room/add-photos-room.component";

@Component({
  selector: 'app-admin-hotel-rooms-details',
  templateUrl: './admin-hotel-rooms-details.component.html',
  styleUrl: './admin-hotel-rooms-details.component.css'
})
export class AdminHotelRoomsDetailsComponent implements OnInit{
  hotelId!: number;
  rooms: RoomWithId[] = [];
  slides: RoomImage[] = [];
  hotelDetails!: Hotel;
  panelOpenState = false;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private hotelService: HotelService,
              private roomService: RoomService,
              private dialog: MatDialog) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.hotelId = parseInt(params['hotelId'], 10);
    });

    this.hotelService.getHotelById(this.hotelId).subscribe({
      next: (data) => {
        this.hotelDetails = data;
        this.hotelDetails.hotelImageUrl = 'data:image/png;base64,'+ this.hotelDetails.hotelImageUrl;
      },
      error: (error) => {
        console.error('Error fetching the hotel details: ', error);
      }
    });

    this.hotelService.getAllRoomsByHotelId(this.hotelId).subscribe({
      next: (data) => {
        this.rooms = data;

        const imageRequests = this.rooms.map(room => {
          return this.roomService.getAllImagesByHotelIdAndRoomId(this.hotelId, room.roomId);
        });

        forkJoin(imageRequests).subscribe({
          next: (imageResults) => {

            this.rooms.forEach((room, index) => {
                const roomImages = imageResults[index];

                if (roomImages && roomImages.length > 0) {
                  roomImages.forEach((roomImage: RoomImage) => {
                    const slide : RoomImage = {
                      roomId: room.roomId,
                      imageName: roomImage.imageName,
                      imageUrl: 'data:image/png;base64,' + roomImage.imageUrl
                    };

                    this.slides.push(slide);
                  });
                }
              }
            );
          },
          error: (error) => {
            console.error('Error fetching the room images: ', error);
          }
        });
      },
      error: (error) => {
        console.error('Error fetching the available rooms: ', error);
      }
    });
  }

  getSlidesForRoom(roomId: number): RoomImage[] {
    return this.slides.filter(slide => slide.roomId === roomId);
  }

  toProfile(){
    this.router.navigate(['profile']).then(r => r);
  }

  logOut() {
    this.authService.logout();
  }

  toAddRoom(hotelId: number) { //TODO in the page for adding a room in the submit form button, I will also navigare to the admin-hotels-rooms-details.component
    this.router.navigate([`/${hotelId}/add-room/newRoom`]).then(r=>r);
  }

  addPhotoToRoom(hotelId: number, roomId: number){
    this.openAddPhotoDialog(hotelId, roomId);
  }

  openAddPhotoDialog(hotelId: number, roomId: number){
    const dialogRef = this.dialog.open(AddPhotosRoomComponent, {
      data: {
        roomId: roomId,
        hotelId: hotelId
      }
    });

  }

  //TODO functionality to add, update and delete rooms, hotels, to see room occupancies and bookings!!!!!!
}
