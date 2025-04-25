import React from "react";


function GroceryCards({ grocery }) {
    const { id, name, description, quantity } = grocery;

    const handleAddToCart = () => {
        const newItem = {
            name,
            description,
            quantity:1,
            grocery_id: id,
            user_id: 1 
            // USER_ID is hard coded now since User is not set up yet!! FIX ME!!
        };

        fetch("http://localhost:5555/itemscart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem)
        })
        .then(resp => resp.json())
        .then(data => {
            alert(`${data.name} added to cart!`);
        })
        .catch(error => console.error("Error adding to cart.", error))
    };

    return (
        <div className="grocery-card">
            <h4>{name}</h4>
            <p>Category: {description}</p>
            <p>Quantity: {quantity}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
}

export default GroceryCards;
