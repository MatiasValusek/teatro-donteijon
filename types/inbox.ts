import type { DatabaseEnum } from "@/types/database";

export type ReservationStatus = DatabaseEnum<"reservation_status">;

export type ReservationFunctionSummary = {
  id: string;
  workId: string;
  workTitle: string;
  workSlug: string;
  date: string;
  time: string;
  startsAtLabel: string;
  venueName: string;
  venueAddress: string;
  reservationUrl: string | null;
  ticketPriceText: string | null;
};

export type AdminReservationListItem = {
  id: string;
  functionId: string;
  workId: string;
  workTitle: string;
  functionLabel: string;
  fullName: string;
  email: string;
  phone: string;
  quantity: number;
  message: string | null;
  status: ReservationStatus;
  createdAtLabel: string;
};

export type AdminContactMessageListItem = {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  createdAtLabel: string;
};
