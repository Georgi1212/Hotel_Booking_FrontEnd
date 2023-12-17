import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class RoomSizeTypeService {
  private selectedRoomSizeType: string = '';
  private selectedRoomCapacity!: number;

  setSelectedRoomSizeType(roomSizeType: string) {
    this.selectedRoomSizeType = roomSizeType;
  }

  getSelectedRoomSizeType(): string {
    return this.selectedRoomSizeType;
  }

  setSelectedRoomCapacity(roomCapacity: number) {
    this.selectedRoomCapacity = roomCapacity;
  }

  getSelectedRoomCapacityType(): number {
    return this.selectedRoomCapacity;
  }


}
