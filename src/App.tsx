import { getFood, deleteFood } from "./api/foodsApi";
import { useEffect, useState } from "react";
import { Food } from "./types/Food";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export function App(props: any) {
  const [inventory, setFoods] = useState<Food[]>([]);
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

  return (
    <>
      <ToastContainer />
      <h1>Restaurant Manager</h1>
      <br />
      <Link className="btn btn-secondary" to="/foodForm">
        Add Food
      </Link>
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
                <td>
                  <Link to={`/food/{$food.id}`}>{food.name}</Link>
                </td>
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
