import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class SucPaymentService {
  hotelId!: number;
  roomId!: number;
  check_in: string = '';
  check_out: string = '';
}
