import { Component } from '@angular/core';
import {RoomSizeType} from "../model/roomSizeType";
import {RoomSizeTypeService} from "../services/roomSizeType-service";

@Component({
  selector: 'app-room-size-type',
  templateUrl: './room-size-type.component.html',
  styleUrl: './room-size-type.component.css'
})
export class RoomSizeTypeComponent {
  roomSizeTypes: RoomSizeType[] = [
    {roomType: 'SINGLE', roomCapacity: 1},
    {roomType: 'DOUBLE', roomCapacity: 2},
    {roomType: 'TRIPLE', roomCapacity: 3},
    {roomType: 'APARTMENT', roomCapacity: 2},
    {roomType: 'APARTMENT', roomCapacity: 3},
    {roomType: 'APARTMENT', roomCapacity: 4},
    {roomType: 'PRESIDENTIAL', roomCapacity: 1},
    {roomType: 'PRESIDENTIAL', roomCapacity: 2}
  ];

  roomSizes: any[] = [
    'SINGLE',
    'DOUBLE',
    'TRIPLE',
    'APARTMENT',
    'PRESIDENTIAL'
  ];

  selectedRoomType: string = '';
  filteredRoomSizeType: RoomSizeType[] = [];
  constructor(private roomSizeTypeService: RoomSizeTypeService) {}

  onRoomTypeSelected(roomType: string) {
    this.selectedRoomType = roomType;
    this.filteredRoomSizeType = this.roomSizeTypes.filter(sizeType => sizeType.roomType == roomType);

    this.roomSizeTypeService.setSelectedRoomSizeType(roomType);
  }

  onRoomCapacitySelected(roomCapacity: number){
    this.roomSizeTypeService.setSelectedRoomCapacity(roomCapacity);
  }
}
