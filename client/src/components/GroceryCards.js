import React from "react";


function GroceryCards({ grocery }) {
    const { name, description, quantity } = grocery;

    return (
        <div className="grocery-card">
            <h4>{name}</h4>
            <p>Category: {description}</p>
            <p>Quantity: {quantity}</p>
            <button onClick={() => alert(`${name} added to cart!`)}>Add to Cart</button>
        </div>
    );
}

export default GroceryCards;
