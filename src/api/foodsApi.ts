export async function getFood() {
    return fetch ("http://localhost:3001/inventory");
}

export async function deleteFood(id:number) {
    const response =  await fetch ("http://localhost:3001/inventory/" + id, {
        method: "DELETE",
    });
    if (!response.ok){
        throw new Error("Delete failed!")
    }
    return await (await response).json();
}

export async function createFood() {
    return fetch ("http://localhost:3001/inventory");
}

export async function updateFood() {
    return fetch ("http://localhost:3001/inventory");
}