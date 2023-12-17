import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {RoomService} from "../services/room-service";
import {RoomSizeTypeService} from "../services/roomSizeType-service";
import {HotelService} from "../services/hotel-service";

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrl: './add-hotel.component.css'
})
export class AddHotelComponent {
  hostEmail!: string;
  addHotelForm: FormGroup;

  errorMessage: string = '';

  infoMessage: string = '';
  isInfoMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private hotelService: HotelService,
    private roomSizeTypeService: RoomSizeTypeService
  ) {
    this.hostEmail = localStorage.getItem('email') || '';

    this.addHotelForm = this.fb.group({
      hotelName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['',Validators.required],
      country: ['', Validators.required],
      hotelDescription: [''],
      hotelImageUrl: null,
      rate: '1',
    });
  }

  addHotel(){
    if(!this.addHotelForm.valid){
      return;
    }

    this.errorMessage = '';

    const city = this.capitalizeFirstLetter(this.addHotelForm.value.city);
    const country = this.capitalizeFirstLetter(this.addHotelForm.value.country);

    this.addHotelForm.patchValue({
      city,
      country
    });

    console.log(this.addHotelForm.value);

    this.hotelService.addHotel(this.hostEmail, this.addHotelForm.value).subscribe({
      next: (value) => {
        this.showInfo(value.message);
      },
      error: () => {
        this.errorMessage = 'An error occurred during adding the room';
      }
    });
  }

  private capitalizeFirstLetter(inputString: string): string {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
  }

  public showInfo(message:string): void {
    this.isInfoMessage = true;
    this.infoMessage = message;
  }

  public closeModal(): void {
    this.isInfoMessage = false;
    this.infoMessage = '';
  }

}
