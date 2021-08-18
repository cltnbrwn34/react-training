import { Food } from "../types/Food";
import { SelectOption } from "../types/SelectOption";

export async function getFoodOptions() {
  const response = await fetch("http://localhost:3001/foodTypes");
  if (!response.ok) throw new Error("Call to get foods failed!");
  return response.json() as Promise<SelectOption[]>;
}

export async function deleteFoodOptions(id: number) {
  const response = await fetch("http://localhost:3001/foodType/" + id, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Delete failed!");
  }
  return response.json();
}

export async function createFood() {
  return fetch("http://localhost:3001/inventory");
}

export async function updateFood() {
  return fetch("http://localhost:3001/inventory");
}
