import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HotelService} from "../services/hotel-service";
import {Hotel} from "../model/hotel";
import {RoomImage} from "../model/roomImage";
import {RoomService} from "../services/room-service";
import {RoomWithId} from "../model/roomWithID";
import {forkJoin} from "rxjs";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.css'
})
export class HotelDetailsComponent implements OnInit{
  panelOpenState = false;
  hotelDetails!: Hotel;
  availableRooms: RoomWithId[] = [];
  slides: RoomImage[] = [];
  hotelId!: number;
  startDate!: Date;
  endDate!: Date;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private hotelService: HotelService,
              private roomService: RoomService) {}
  ngOnInit(){
    this.route.params.subscribe((params) => {
      this.hotelId = parseInt(params['hotelId'], 10);
    });

    this.route.queryParams.subscribe((queryParams) => {
      this.startDate = queryParams['startDate'];
      this.endDate = queryParams['endDate'];
    })

    this.hotelService.getHotelById(this.hotelId).subscribe({
      next: (data) => {
        this.hotelDetails = data;
        this.hotelDetails.hotelImageUrl = 'data:image/png;base64,'+ this.hotelDetails.hotelImageUrl;
      },
      error: (error) => {
        console.error('Error fetching the hotel details: ', error);
      }
    });

    this.hotelService.getAvailableRooms(this.hotelId, this.startDate, this.endDate).subscribe({
      next: (data) => {
        this.availableRooms = data;

        const imageRequests = this.availableRooms.map(room => {
          return this.roomService.getAllImagesByHotelIdAndRoomId(this.hotelId, room.roomId);
        });

        forkJoin(imageRequests).subscribe({
          next: (imageResults) => {

            this.availableRooms.forEach((room, index) => {
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

  toCart(hotelId: number, hotelName: string, city: string, country: string,
         roomId: number, startDate: Date, endDate: Date, roomPrice: number){

    const user_email = localStorage.getItem('email') || '';

    this.router.navigate([`cart-payment/${hotelId}/${roomId}`], {
      queryParams: {
        hotelName: hotelName,
        hotelCity: city,
        hotelCountry: country,
        startDate: startDate,
        endDate: endDate,
        email: user_email,
        roomPrice: roomPrice
      }}).then(r => r);

}

  logOut() {
    this.authService.logout();
  }

  protected readonly parseInt = parseInt;
}
