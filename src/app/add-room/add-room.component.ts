import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {RoomService} from "../services/room-service";
import {RoomSizeType} from "../model/roomSizeType";
import {RoomSizeTypeService} from "../services/roomSizeType-service";

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css'
})
export class AddRoomComponent {
  hotelId!: number;
  addRoomForm: FormGroup;

  errorMessage: string = '';

  infoMessage: string = '';
  isInfoMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private roomService: RoomService,
    private roomSizeTypeService: RoomSizeTypeService
  ) {
    this.route.params.subscribe((params) => {
      this.hotelId = parseInt(params['hotelId'], 10);
    });

    this.addRoomForm = this.fb.group({
      roomPrice: ['', Validators.required],
      description: ['', Validators.required],
      numChildren: [Validators.required],
      numAdults: [Validators.required],
      roomSizeTypeDto: this.fb.group({
        roomType: ['', Validators.pattern('^(SINGLE|DOUBLE|TRIPLE|APARTMENT|PRESIDENTIAL)$')],
        roomCapacity: [0, Validators.max(4)],
      }),
    });
  }

  addRoom(){
    if(!this.addRoomForm.valid){
      return;
    }

    this.errorMessage = '';

    const roomPrice = parseFloat(this.addRoomForm.value.roomPrice);
    const numAdults = parseInt(this.addRoomForm.value.numAdults, 10);
    const numChildren = parseInt(this.addRoomForm.value.numChildren, 10);

    this.addRoomForm.patchValue({
      roomPrice,
      numAdults,
      numChildren,
    });

    this.addRoomForm.removeControl('roomSizeTypeDto');

    this.addRoomForm.addControl('roomSizeTypeDto', this.fb.group({
      roomType: [this.roomSizeTypeService.getSelectedRoomSizeType(), Validators.pattern('^(SINGLE|DOUBLE|TRIPLE|APARTMENT|PRESIDENTIAL)$')],
      roomCapacity: [this.roomSizeTypeService.getSelectedRoomCapacityType(), Validators.max(4)],
    }));

    console.log(this.addRoomForm);

    this.roomService.addRoom(this.hotelId, this.addRoomForm.value).subscribe({
      next: (value) => {
        this.showInfo(value.message);
      },
      error: () => {
        this.errorMessage = 'An error occurred during adding the room';
      }
    });
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
