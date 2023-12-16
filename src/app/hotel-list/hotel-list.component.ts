import {Component, OnInit} from '@angular/core';
import {HotelService} from "../services/hotel-service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.css'
})
export class HotelListComponent implements OnInit{
  availableHotels: any[] = [];
  selectedCountry: string = '';
  selectedCity: string = '';
  startDate!: Date;
  endDate!: Date;

  constructor(
    private authService: AuthService,
    private hotelService: HotelService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.selectedCountry = queryParams['country'];
      this.selectedCity = queryParams['city'];
      this.startDate = queryParams['startDate'];
      this.endDate = queryParams['endDate'];
    });
    this.fetchAvailableHotels();
  }

  fetchAvailableHotels() {

    if(this.selectedCountry && this.startDate && this.endDate){
      this.hotelService.getAvailableHotels(
        this.selectedCountry,
        this.selectedCity,
        this.startDate,
        this.endDate
      ).subscribe({
        next: (data) => {
          this.availableHotels = data.map((hotel: { hotelImageUrl: any; }) => {
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
  }

  private transform(image: string){
    return 'data:image/png;base64,' + image;

  }

  viewHotelDetails(hotelId:number) {
    this.router.navigate([`/hotel-details/${hotelId}`], {
      queryParams: {
        startDate: this.startDate,
        endDate: this.endDate
      }}).then(r => r);
  }

  backToFilter(){
    this.router.navigate(['/welcome-page']).then(r => r);
  }

  toProfile(){
    this.router.navigate(['profile']).then(r => r);
  }

  logOut() {
    this.authService.logout();
  }

}
