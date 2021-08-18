import { getFood, deleteFood } from "./api/foodsApi";
import { getFoodOptions, deleteFoodOptions } from "./api/foodTypesApi";
import React, { useEffect, useState } from "react";
import { Food, NewFood } from "./types/Food";
import { Input } from "./components/Input";
import { Select } from "./components/select";
import { SelectOption } from "./types/SelectOption";

const emptyFood: NewFood = {
  name: "",
  quantity: "",
  minimumQuantity: "",
  type: "",
};

export function App(props: any) {
  const [inventory, setFoods] = useState<Food[]>([]);
  const [newFood, setNewFood] = useState<NewFood>(emptyFood);
  //const [foodOptions, setFoodOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    async function callGetFood() {
      const data = await getFood();
      setFoods(data);
    }
    callGetFood();
  }, []); //using empty array for useEffect since we only want this to run once

  // useEffect(() => {
  //   async function callGetFoodOptions() {
  //     const data = await getFoodOptions();
  //     setFoodOptions(data);
  //   }
  //   callGetFoodOptions();
  // }, []); //using empty array for useEffect since we only want this to run once
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    //create new object that containes one udpated property
    const { value, id } = event.target;
    setNewFood({ ...newFood, [id]: value });
  }

  return (
    <>
      <h1>Restaurant Manager</h1>
      <form>
        <Input
          onChange={onChange}
          id="name"
          label="Name"
          inputType="text"
          value={newFood.name}
        />
        <Input
          onChange={onChange}
          id="quantity"
          label="Quantity"
          inputType="number"
          value={newFood.quantity}
        />
        <Input
          onChange={onChange}
          id="minimumQuantity"
          label="Minimum Quantity"
          inputType="number"
          value={newFood.minimumQuantity}
        />
        <br />
        <br />
        <Select
          id="type"
          label="Type"
          placeholderOption="Select an option"
          value={newFood.type}
          options={[
            {
              label: "Vegetable",
              value: "vegetable",
            },
            {
              label: "Meat",
              value: "meat",
            },
            {
              label: "Forut",
              value: "fruit",
            },
          ]}
        />
      </form>
      <ul>
        {/* exercise 1: display quantity next to food with a dash in between */}
        <table>
          <thead>
            <tr>
              <th>Delete</th>
              <th>Qty.</th>
              <th>Name</th>
              <th>Min Qty.</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {/*add a delete button next to name. When clicekd, alert('clicked')*/}
            {inventory.map((food) => (
              <tr key={food.id}>
                <td>
                  <button
                    type="button"
                    onClick={async () => {
                      deleteFood(food.id);
                      //remove deleted food from state
                      const remainingInventory = inventory.filter(
                        (fud) => fud.id !== food.id
                      );
                      setFoods(remainingInventory);
                    }}
                  >
                    X
                  </button>
                </td>
                <td>{food.quantity}</td>
                <td>{food.name}</td>
                <td>{food.minimumQuantity}</td>
                <td>{food.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ul>
    </>
  );
}
