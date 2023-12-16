import {RoomSizeType} from "./roomSizeType";

export interface Room{
  roomPrice: number;
  description: string;
  numChildren: number;
  numAdults: number;
  roomSizeTypeDto: RoomSizeType;
}
