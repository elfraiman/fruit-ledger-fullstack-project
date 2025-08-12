// Fruit-related types shared between frontend and backend
export interface IFruityviceNutrition {
  calories: number;
  fat: number;
  sugar: number;
  carbohydrates: number;
  protein: number;
}

export interface FruityviceFruit {
  genus: string;
  name: string;
  id: number;
  family: string;
  order: string;
  nutritions: IFruityviceNutrition;
}

// Base fruit type (without DB-specific fields)
export interface IFruit {
  id: number;
  name: string;
  fruityvice_id: number;
}

export interface IFruitWithCalories extends IFruit {
  calories: number | null;
  nutrition?: IFruityviceNutrition;
}

export interface IFruitPurchase {
  id: number;
  amount: number;
}

export interface IFruitPurchaseWithCalories extends IFruitPurchase {
  calories: number;
}
