export interface BookingRow{
  bookingId: number;
  userEmail: string;
  userFirstName: string,
  userLastName: string,
  userPhoneNumber: string,
  roomId: number,
  roomPrice: number,
  check_in: string,
  check_out: string,
  sumPrice: number,
  createdAt: string
}
