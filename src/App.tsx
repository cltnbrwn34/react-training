import { getFood } from "./api/foodsApi"
import { useEffect, useState} from "react"
type Food = {
    id: number
    name: string;
    quantity: number;
    minimumQuantity: number;
    type: string;
};

export function App(props: any) {

    const [inventory, setFoods] = useState<Food[]>([]);

    useEffect(() => {
        async function callGetFood(){
        const response = await getFood();
        if (!response.ok) throw new Error("Call to getFood failed!");
        const json = await response.json();
        setFoods(json);
        }
        callGetFood();
    });
    
    return (
    <>
      <h1>Restaurant Manager</h1>
      <ul>
        {/* exercise 1: display quantity next to food with a dash in between */}
        <table>
          <thead>
              <tr>
                <th>Qty.</th>
                <th>Name</th>
                <th>Min Qty.</th>
                <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((food) => (
                <tr key={food.id}>
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
