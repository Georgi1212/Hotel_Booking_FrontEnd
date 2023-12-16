import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HotelService} from "../services/hotel-service";
import {AuthService} from "../services/auth.service";
import {InitialFilterService} from "../services/initialFilter-service";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})

export class WelcomePageComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  countries : string[] = [];
  cities: string[] = [];
  selectedCountry: string = '';
  selectedCity: string = '';

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private authService:AuthService,
    private initialFilterService: InitialFilterService,
    private router: Router) {
      this.fetchCountries();
  }

  fetchCountries(){
    this.hotelService.getUniqueCountries().subscribe({
      next: (data) => {
        this.countries = data;
      },
      error: (error) => {
        console.error('Error fetching countries:', error);
      }
    });
  }

  fetchCities(){
    if(this.selectedCountry) {
      this.hotelService.getUniqueCities(this.selectedCountry).subscribe({
        next: (data) => {
          this.cities = data;
        },
        error: (error) => {
          console.error('Error fetching cities:', error);
        }
      })
    }
  }
  onCountryChange() {
    this.fetchCities();
  }

  onSubmit(){
    this.initialFilterService.selectedCountry = this.selectedCountry;
    this.initialFilterService.selectedCity = this.selectedCity;
    this.initialFilterService.startDate = <Date>this.range.value.start ?? null;
    this.initialFilterService.endDate = <Date>this.range.value.end ?? null;

    const formattedStartDate = this.hotelService.formatDate(this.initialFilterService.startDate);
    const formattedEndDate = this.hotelService.formatDate(this.initialFilterService.endDate);

    this.router.navigate(['/hotel-list'],
      {queryParams: {
                country: this.selectedCountry,
                city: this.selectedCity,
                startDate: formattedStartDate,
                endDate: formattedEndDate
              }}).then(r => r);
  }

  toProfile(){
    this.router.navigate(['profile']).then(r => r);
  }

  logOut() {
    this.authService.logout();
  }
}
