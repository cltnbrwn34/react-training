import { Food, NewFood } from "../types/Food";

const baseUrl = process.env.REACT_APP_BASE_URL;

export async function getFood() {
  const response = await fetch(baseUrl + "inventory");
  if (!response.ok) throw new Error("Call to get foods failed!");
  return response.json() as Promise<Food[]>;
}

export async function getSingleFood(id: number) {
  const response = await fetch(baseUrl + "inventory/" + id);
  if (!response.ok) throw new Error("Call to get a single food failed!");
  return response.json() as Promise<Food>;
}

export async function deleteFood(id: number) {
  const response = await fetch(baseUrl + "inventory/" + id, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Delete failed!");
  }
  return response.json();
}

export async function createFood(newFood: NewFood) {
  const response = await fetch("http://localhost:3001/inventory/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newFood),
  });
  if (!response.ok) {
    throw new Error("Insert failed!");
  }
  return response.json();
}

export async function updateFood(food: Food) {
  const response = await fetch(
    "http://localhost:3001/inventory/update/" + food.id,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(food),
    }
  );
}
