import { getFood, deleteFood, createFood } from "./api/foodsApi";
import { getFoodOptions, deleteFoodOptions } from "./api/foodTypesApi";
import React, { useEffect, useState } from "react";
import { Food, NewFood } from "./types/Food";
import { Input } from "./components/Input";
import { Select } from "./components/select";
import { SelectOption } from "./types/SelectOption";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  function onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    //create new object that containes one udpated property
    const { value, id } = event.target;
    setNewFood({ ...newFood, [id]: value });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    //Exercise2: save form data
    //tip: create - http:localhost:3001/foods
    //post
    event.preventDefault();
    try {
      const addedFood = await createFood(newFood);
      setFoods([...inventory, addedFood]);
      setNewFood(emptyFood);
      toast.success(addedFood.name + " added to Inventory!🐱‍🚀");
    } catch (error) {
      alert("error");
    }
  }
  return (
    <>
      <ToastContainer />
      <h1>Restaurant Manager</h1>
      <form onSubmit={handleSubmit}>
        <Input
          onChange={onChange}
          id="name"
          label="Name"
          type={props.type}
          value={newFood.name}
        />
        <Input
          onChange={onChange}
          id="quantity"
          label="Quantity"
          type="number"
          value={newFood.quantity}
        />
        <Input
          onChange={onChange}
          id="minimumQuantity"
          label="Minimum Quantity"
          type="number"
          value={newFood.minimumQuantity}
        />
        <Select
          onChange={onChange}
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
        <input type="submit" value="Save Food" />
      </form>
      <br />
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
