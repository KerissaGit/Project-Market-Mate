import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import GroceryCards from "./GroceryCards";
import GroceryForm from "./GroceryForm";


function Groceries() {
    const [groceries, setGroceries] = useState([]);
    const { user } = useOutletContext();

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
            <div className="grocery-list">
                {groceries.map((item) => (
                    <GroceryCards key={item.id} grocery={item} user={user}/>
                ))}
            </div>
            <GroceryForm onNewGrocery={handleNewGrocery} />
            <br></br>
            <br></br>
        </div>
    );
}

export default Groceries;
