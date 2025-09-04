export type FlightCategory = "Black" | "Platinum" | "Gold" | "Normal";

export interface Passenger {
  id: number;
  name: string;
  hasConnections: boolean;
  age: number;
  flightCategory: FlightCategory;
  reservationId: string;
  hasCheckedBaggage: boolean;
}

export interface Flight {
  flightCode: string;
  passengers: Passenger[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateFlightRequest {
  flightCode: string;
  passengers: Passenger[];
}

export interface UpdateFlightRequest {
  flightCode?: string;
  passengers?: Passenger[];
}
