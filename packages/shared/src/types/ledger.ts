// Ledger-related types shared between frontend and backend
export interface IPurchaseRequest {
  fruits: Array<{
    id: number;
    amount: number;
  }>;
  locationId: number;
}

export interface IPurchaseRequestWithCalories {
  fruits: Array<{
    id: number;
    amount: number;
    calories: number;
  }>;
  locationId: number;
}

export interface ILedgerEntry {
  id: number;
  fruit_id: number;
  location_id: number;
  amount: number;
  created_at: string;
}
