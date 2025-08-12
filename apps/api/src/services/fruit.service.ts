import axios from 'axios';
import { asc } from 'drizzle-orm';
import { db } from '../db/db-index';
import { fruit } from '../db/schema';
import { log } from '../utils/logger';
import { IFruityviceNutrition, FruityviceFruit, IFruitWithCalories } from '@lepaya/shared/dist';
import { createApiError } from '../middleware/errorHandler';

/** 
 * Fetch nutritional data from Fruityvice API by Fruityvice ID
 */
export async function fetchFruitNutritionById(fruityviceId: number): Promise<IFruityviceNutrition | null> {
  try {
    const response = await axios.get<FruityviceFruit>(
      `https://www.fruityvice.com/api/fruit/${fruityviceId}`,
      {
        timeout: 5000,
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    return response.data.nutritions;
  } catch (error: any) {
    if (error.response?.status === 404) {
      log.warn(`[FruityviceService] Fruit ID not found in Fruityvice API: ${fruityviceId}`);
    } else {
      log.error(`[FruityviceService] Error fetching nutrition for ID ${fruityviceId}:`, error.message);
    }
    return null;
  }
}


export async function getCaloriesForFruit(
  fruityviceId: number | null
): Promise<number | null> {
  if (fruityviceId) {
    const nutrition = await fetchFruitNutritionById(fruityviceId);
    if (nutrition) {
      return nutrition.calories;
    }
  }
  // Could implement a fallback to fetch by fruit Name if we don't have the fruityviceId
  // TODO: Implement this
  //

  return null;
}

export async function getFruitsWithCalories() {
  const allFruits = await db
    .select()
    .from(fruit)
    .orderBy(asc(fruit.name));

  if (!allFruits.length) {
    throw createApiError('No fruits found', 404);
  }

  const fruitsWithCalories: IFruitWithCalories[] = await Promise.all(
    allFruits.map(async (fruitItem) => {
      const calories = await getCaloriesForFruit(fruitItem.fruityvice_id);
      return {
        ...fruitItem,
        name: fruitItem.name || 'Unknown',
        fruityvice_id: fruitItem.fruityvice_id || 0,
        calories: calories ?? 0
      };
    })
  );

  return fruitsWithCalories;
}