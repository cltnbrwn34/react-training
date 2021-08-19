import { createFood, getSingleFood } from "./api/foodsApi";
import React, { useState, useEffect } from "react";
import { NewFood } from "./types/Food";
import { Input } from "./components/Input";
import { Select } from "./components/select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useParams } from "react-router-dom";

const emptyFood: NewFood = {
  name: "",
  quantity: "",
  minimumQuantity: "",
  type: "",
};

export function FoodForm(props: any) {
  const [food, setFood] = useState<NewFood>(emptyFood);
  const history = useHistory();
  const { foodId } = useParams() as any;

  function onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    //create new object that containes one udpated property
    const { value, id } = event.target;
    setFood({ ...food, [id]: value });
  }

  //exercise 2 day 3: use foodId to set heading to either"Add Food" or "Edit Food"

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    //Exercise2: save form data
    //tip: create - http:localhost:3001/foods
    //post
    event.preventDefault();
    try {
      const addedFood = await createFood(food);
      toast.success(addedFood.name + " added to Inventory!🐱‍🚀");
      history.push("/"); //redirect to home
    } catch (error) {
      alert("error");
    }
  }
  useEffect(() => {
    async function fetchFood() {
      const _food = await getSingleFood(foodId);
      setFood(_food);
    }
    fetchFood();
  }, [foodId]);
  return (
    <>
      <ToastContainer />
      <h1>{foodId != null ? "Edit Food" : "Add Food"}Food</h1>
      <form onSubmit={handleSubmit}>
        <Input
          onChange={onChange}
          id="name"
          label="Name"
          type={props.type}
          value={food.name}
        />
        <Input
          onChange={onChange}
          id="quantity"
          label="Quantity"
          type="number"
          value={food.quantity}
        />
        <Input
          onChange={onChange}
          id="minimumQuantity"
          label="Minimum Quantity"
          type="number"
          value={food.minimumQuantity}
        />
        <Select
          onChange={onChange}
          id="type"
          label="Type"
          placeholderOption="Select an option"
          value={food.type}
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
        <input className="btn btn-success" type="submit" value="Save Food" />
      </form>
      <br />
    </>
  );
}
