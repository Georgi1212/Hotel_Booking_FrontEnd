import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Room} from "../model/room";
import {RoomService} from "../services/room-service";
import {RoomSizeTypeService} from "../services/roomSizeType-service";

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrl: './update-room.component.css'
})
export class UpdateRoomComponent implements OnInit{
  roomId!: number;
  hotelId!: number;
  roomForm!: FormGroup;
  room!:Room;
  public error: boolean = false;
  public errorMessage: string = '';

  @Output() room_emit = new EventEmitter<any>();
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any,
              private fb: FormBuilder,
              private roomService: RoomService,
              private roomSizeTypeService: RoomSizeTypeService) {
  }

  ngOnInit(): void {
    this.roomId = this.dialogData.roomId;
    this.hotelId = this.dialogData.hotelId;
    this.room = this.dialogData.room;

    this.roomForm = this.fb.group({
      roomPrice: [this.room.roomPrice],
      description: [this.room.description],
      numChildren:[this.room.numChildren],
      numAdults: [this.room.numAdults],
      roomSizeTypeDto: this.fb.group({
        roomType: [this.room.roomSizeTypeDto.roomType],
        roomCapacity: [this.room.roomSizeTypeDto.roomCapacity],
      })
    })
  }

  public showError(message:string): void {
    this.error = true;
    this.errorMessage = message;
  }

  public closeModal(): void {
    this.error = false;
    this.errorMessage = '';
  }
  updateRoom() {

    const roomPrice = parseFloat(this.roomForm.value.roomPrice);
    const numAdults = parseInt(this.roomForm.value.numAdults, 10);
    const numChildren = parseInt(this.roomForm.value.numChildren, 10);

    this.roomForm.patchValue({
      roomPrice,
      numAdults,
      numChildren,
    });

    this.roomForm.removeControl('roomSizeTypeDto');

    this.roomForm.addControl('roomSizeTypeDto', this.fb.group({
      roomType: [this.roomSizeTypeService.getSelectedRoomSizeType(), Validators.pattern('^(SINGLE|DOUBLE|TRIPLE|APARTMENT|PRESIDENTIAL)$')],
      roomCapacity: [this.roomSizeTypeService.getSelectedRoomCapacityType(), Validators.max(4)],
    }));

    this.roomService.updateRoom(this.hotelId, this.roomId, this.roomForm.value).subscribe({
      next: (value) => {
        console.log(value);
        this.room_emit.emit(value);
        this.roomForm.reset();

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
