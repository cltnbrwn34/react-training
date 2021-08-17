import { getFood, deleteFood } from "./api/foodsApi"
import { useEffect, useState} from "react"
export type Food = {
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
            const data = await getFood();
            setFoods(data);
        }
        callGetFood();
    }, []);//using empty array for useEffect since we only want this to run once
    
    return (
    <>
      <h1>Restaurant Manager</h1>
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
                    <td><button type="button" onClick={async () => {
                        deleteFood(food.id);
                        //remove deleted food from state
                        const remainingInventory = inventory.filter(fud => fud.id !== food.id);
                        setFoods(remainingInventory);
                    }}>X</button></td>
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
