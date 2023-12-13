import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {AngularMaterialModule} from "../angular-material/angular-material.module";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {RoomService} from "../services/room-service";
import {HotelService} from "../services/hotel-service";
import {OccupancyService} from "../services/occupancy-service";
import {AuthService} from "../services/auth.service";
import {InitialFilterService} from "../services/initialFilter-service";

@Component({
  selector: 'app-welcome-page',
  //standalone: true,
  //imports: [CommonModule, MatFormFieldModule, MatOptionModule, MatSelectModule, AngularMaterialModule, ReactiveFormsModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})

export class WelcomePageComponent {
  //filterForm: FormGroup;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  countries : string[] = [];
  cities: string[] = [];
  selectedCountry: string | null = null;
  selectedCity: string = '';

  constructor(
    private hotelService: HotelService,
    private authService:AuthService,
    private initialFilterService: InitialFilterService,
    private router: Router) {
      this.fetchCountries();
  }

  setCountry(country: string){
    this.selectedCountry = country;
  }

  setCity(city: string){
    this.selectedCity = city;
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
    this.initialFilterService.startDate = this.range.value.start ?? null;
    this.initialFilterService.endDate = this.range.value.end ?? null;

    this.router.navigate(['/hotel-list']).then(r => r);
  }

  logOut() {
    this.authService.logout();
  }
}
