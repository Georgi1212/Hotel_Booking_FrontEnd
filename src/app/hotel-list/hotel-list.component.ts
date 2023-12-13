import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {InitialFilterService} from "../services/initialFilter-service";
import {HotelService} from "../services/hotel-service";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hotel-list',
  //standalone: true,
  //imports: [CommonModule],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.css'
})
export class HotelListComponent implements OnInit{
  availableHotels: any[] = [];
  constructor(
    private hotelService: HotelService,
    private initialFilterService: InitialFilterService,
    private router: Router) {}

  ngOnInit(): void {
    this.fetchAvailableHotels();
  }

  fetchAvailableHotels() {
    const {
      selectedCountry,
      selectedCity,
      startDate,
      endDate
    } = this.initialFilterService;

    if(selectedCountry && startDate && endDate){
      this.hotelService.getAvailableHotels(
        selectedCountry,
        selectedCity,
        startDate,
        endDate
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

  backToFilter(){
    this.router.navigate(['/welcome-page']).then(r => r);
  }

}
