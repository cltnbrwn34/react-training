import { useEffect, useState } from "react";
import { getFoods, deleteFood } from "./api/foodsApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export type Food = {
  id: number;
  name: string;
  quantity: number;
  minQuantity: number;
  type: string;
};

export function Home() {
  // Long form of the above that avoids using array destructuring.
  // const foodStateArray = useState<Food[]>([]);
  // const foods = foodStateArray[0];
  // const setFoods = foodStateArray[1];
  const { data: foods, isLoading } = useQuery("foods", getFoods);

  if (isLoading || !foods) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <ReactQueryDevtools />
      <ToastContainer />
      <h1>Food Manager</h1>

      <Link className="btn btn-secondary" to="/food">
        Add Food
      </Link>
      {foods.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Min Quantity</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food.name}>
                <td>
                  <button
                    onClick={async () => {
                      await deleteFood(food.id);
                      // Return a new array with the id that was just deleted omitted.
                      const newFoods = foods.filter((f) => f.id !== food.id);
                      //setFoods(newFoods);
                    }}
                  >
                    X
                  </button>
                </td>
                {/* Exercise 3: Link to the edit page for each food */}
                <td>
                  <Link to={"/food/" + food.id}>{food.name}</Link>
                </td>
                <td>{food.quantity}</td>
                <td>{food.minQuantity}</td>
                <td>{food.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>Uh oh, no food in pantry!</h3>
      )}
    </>
  );
}
