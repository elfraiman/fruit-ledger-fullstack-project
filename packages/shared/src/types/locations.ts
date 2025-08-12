// Location-related types shared between frontend and backend
export interface ILocation {
  id: number;
  name: string;
  headcount: number;
}

export interface ILocationInsert {
  name: string;
  headcount: number;
}
