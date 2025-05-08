import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import GroceryCards from "./GroceryCards";
import GroceryForm from "./GroceryForm";


function Groceries() {
    const [groceries, setGroceries] = useState([]);
    const { loggedInUser } = useOutletContext();

    useEffect(() => {
        fetch("http://localhost:5555/groceries")
            .then((resp) => resp.json())
            .then((data) => setGroceries(data))
            .catch((error) => console.error("Error fetching groceries:", error));
    }, []);


    const handleNewGrocery = (newItem) => {
        setGroceries([...groceries, newItem]);
    };
    

    return (
        <div>
            <h2>Groceries Page</h2>
            <div className="grocery-list">
                {groceries.map((item) => (
                    <GroceryCards key={item.id} grocery={item} loggedInUser={loggedInUser}/>
                ))}
            </div>
            <GroceryForm onNewGrocery={handleNewGrocery} />
        </div>
    );
}

export default Groceries;
