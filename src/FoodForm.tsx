import { getFood, createFood } from "./api/foodsApi";
import React, { useEffect, useState } from "react";
import { Food, NewFood } from "./types/Food";
import { Input } from "./components/Input";
import { Select } from "./components/select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

const emptyFood: NewFood = {
  name: "",
  quantity: "",
  minimumQuantity: "",
  type: "",
};

export function FoodForm(props: any) {
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

  const history = useHistory();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    //Exercise2: save form data
    //tip: create - http:localhost:3001/foods
    //post
    event.preventDefault();
    try {
      const addedFood = await createFood(newFood);
      toast.success(addedFood.name + " added to Inventory!🐱‍🚀");
      history.push("/"); //redirect to home
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
              label: "Fruit",
              value: "fruit",
            },
          ]}
        />
        <input type="submit" value="Save Food" />
      </form>
      <br />
    </>
  );
}
