
type Food = {
    name: string;
    quantity: number;
};

const inventory: Food[] = [
    { name: "Carrot", quantity: 3 },
    { name: "Potato", quantity: 8 },
];

export function App(props: any) {
    function renderInventory() {
        return inventory.map(food => <li>{food.name}</li>)
    }
    return (
    <>
        <h1>Restaurant Manager</h1>
        <ul>
            { renderInventory()}
        </ul>
    </>);
}