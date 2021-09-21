export type Booking = {
  time: number;
  duration: number;
  userId: string;
};

export type NewBooking = Booking & {
  hasConflict: boolean;
};

export type NewBookingRecord = {
  time: string;
  duration: string;
  userId: string;
};
