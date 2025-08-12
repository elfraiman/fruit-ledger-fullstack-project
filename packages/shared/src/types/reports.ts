// Report-related types shared between frontend and backend
export interface IFruitConsumption {
  fruit_name: string | null;
  total_eaten: number;
}

export interface ITotalConsumptionByLocation {
  location_id: number;
  location_name: string | null;
  total_fruit_consumed: number;
  average_per_person: number;
  headcount: string | null;
}

export interface IConsumptionReport {
  total_consumption: ITotalConsumptionByLocation;
  most_consumed_fruit: IFruitConsumption;
}
