import React, { useState } from "react";


function GroceryCards({ grocery, loggedInUser }) {
    const { id, name, description } = grocery;
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        if (!loggedInUser) {
            alert("Please log in to add items to your cart.");
            return;
        }

        const newItem = {
            name,
            description,
            quantity,
            grocery_id: id,
            user_id: loggedInUser.id
        };

        fetch("http://localhost:5555/itemscart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newItem)
        })
        .then(resp => resp.json())
        .then(data => {
            alert(`${data.name} added to cart!`);
        })
        .catch(error => console.error("Error adding to cart.", error));
    };

    const handleDelete = () => {
        fetch(`http://localhost:5555/groceries/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            alert(`${name} removed from groceries.`);
        });
    };

    return (
        <div className="grocery-card">
            <h4>{name}</h4>
            <p>Category: {description}</p>
            <div className="quantity-wrapper">
                <label htmlFor="quantity">Quantity:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="quantity-box"
                    min="1"
                />
            </div>
            <div className="card-button-group">
                <button onClick={handleAddToCart} className="action-button">Add to Cart</button>
                <button onClick={handleDelete} className="remove-button">Remove</button>
            </div>
        </div>
    );
}

export default GroceryCards;
