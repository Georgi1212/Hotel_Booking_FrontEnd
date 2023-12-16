import {RoomSizeType} from "./roomSizeType";

export interface RoomWithId{
  roomId: number;
  roomPrice: number;
  description: string;
  numChildren: number;
  numAdults: number;
  roomSizeTypeDto: RoomSizeType;
}
