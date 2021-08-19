import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { addFood, getFood } from "./api/foodsApi";
import { Input } from "./shared/Input";
import { Select } from "./shared/Select";
import { useHistory, useParams } from "react-router-dom";

export type NewFood = {
  name: string;
  quantity: number;
  minQuantity: number;
  type: string;
};

const emptyFood: NewFood = {
  name: "",
  quantity: 0,
  minQuantity: 0,
  type: "",
};

export function FoodForm() {
  const [food, setFood] = useState<NewFood>(emptyFood);
  const history = useHistory();
  const { foodId } = useParams() as any;

  useEffect(() => {
    async function fetchFood() {
      const _food = await getFood(foodId);
      setFood(_food);
    }
    if (foodId) fetchFood();
  }, [foodId]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await addFood(food);
      toast.success(food.name + " was saved! 🦄");
      history.push("/"); // Redirect to home.
    } catch (error) {
      toast.error("Failed to add " + food.name);
    }
  }

  // Implementing single onChange handler by convention.
  // id coorellates to the property in state.
  function onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { value, id } = event.target;
    // Create a copy of existing state, but change the name property to the new value
    setFood({
      ...food,
      [id]: value,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{foodId ? "Edit" : "Add"} Food</h1>
      <Input onChange={onChange} id="name" label="Name" value={food.name} />
      <Input
        onChange={onChange}
        id="quantity"
        label="Quantity"
        type="number"
        value={food.quantity.toString()}
      />
      <Input
        onChange={onChange}
        id="minQuantity"
        label="Min Quantity"
        type="number"
        value={food.minQuantity.toString()}
      />
      <Select
        id="type"
        label="Type"
        onChange={onChange}
        placeholderOption="Select Type"
        value={food.type}
        options={[
          { label: "Vegetable", value: "vegetable" },
          { label: "Meat", value: "meat" },
          { label: "Fruit", value: "fruit" },
        ]}
      />
      <input className="btn btn-success" type="submit" value="Save Food" />
    </form>
  );
}
