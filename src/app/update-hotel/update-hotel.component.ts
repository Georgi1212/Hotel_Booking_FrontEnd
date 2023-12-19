import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {RoomSizeTypeService} from "../services/roomSizeType-service";
import {Hotel} from "../model/hotel";
import {HotelService} from "../services/hotel-service";

@Component({
  selector: 'app-update-hotel',
  templateUrl: './update-hotel.component.html',
  styleUrl: './update-hotel.component.css'
})
export class UpdateHotelComponent {
  hotelId!: number;
  hotelForm!: FormGroup;
  hotel!:Hotel;
  public error: boolean = false;
  public errorMessage: string = '';

  @Output() hotel_emit = new EventEmitter<any>();
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any,
              private fb: FormBuilder,
              private hotelService: HotelService) {
  }

  ngOnInit(): void {
    this.hotelId = this.dialogData.hotelId;
    this.hotel = this.dialogData.hotel;

    this.hotelForm = this.fb.group({
      hotelName: [this.hotel.hotelName],
      street: [this.hotel.street],
      city:[this.hotel.city],
      country: [this.hotel.country],
      hotelDescription: [this.hotel.hotelDescription],
      hotelImage: null,
      rate: [this.hotel.rate]
    })
  }

  public showError(message:string): void {
    this.error = true;
    this.errorMessage = message;
  }

  public closeModal(): void {
    this.error = false;
    this.errorMessage = '';

    setTimeout(() => {
      location.reload();
    }, 1000);
  }
  updateHotel() {
    this.hotelService.updateHotel(this.hotelId, this.hotelForm.value).subscribe({
      next: (value) => {
        console.log(value);
        this.hotel_emit.emit(value);
        this.hotelForm.reset();

        setTimeout(() => {
          location.reload();
        }, 100);
      },
      error: (error) => {
        console.log(error);
        this.showError(error.error.Message);
      }
    })
  }
}
