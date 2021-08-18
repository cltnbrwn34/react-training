import { Food } from "../types/Food";

export async function getFood() {
    const response = await fetch ("http://localhost:3001/inventory");
    if(!response.ok) throw new Error("Call to get foods failed!");
    return response.json() as Promise<Food[]>;
    
}

export async function deleteFood(id:number) {
    const response =  await fetch ("http://localhost:3001/inventory/" + id, {
        method: "DELETE",
    });
    if (!response.ok){
        throw new Error("Delete failed!")
    }
    return response.json();
}

export async function createFood() {
    return fetch ("http://localhost:3001/inventory");
}

export async function updateFood() {
    return fetch ("http://localhost:3001/inventory");
}