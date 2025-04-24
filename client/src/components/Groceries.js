import React, { useEffect, useState } from "react";
import GroceryCards from "./GroceryCards";


function Groceries() {
    const [groceries, setGroceries] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5555/groceries")
            .then((resp) => resp.json())
            .then((data) => setGroceries(data))
            .catch((error) => console.error("Error fetching groceries:", error));
    }, []);

    return (
        <div>
            <h2>Groceries Page</h2>
            <div className="grocery-list">
                {groceries.map((item) => (
                    <GroceryCards key={item.id} grocery={item} />
                ))}
            </div>
        </div>
    );
}

export default Groceries;
