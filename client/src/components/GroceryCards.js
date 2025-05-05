// import React, { useState } from "react";


// function GroceryCards({ grocery }) {
//     const { id, name, description } = grocery;
//     const [quantity, setQuantity] = useState(1);

//     const handleAddToCart = () => {
//         const newItem = {
//             name,
//             description,
//             quantity,
//             grocery_id: id,
//             user_id: 1 
//             // USER_ID is hard coded now since User is not set up yet!! FIX ME!!
//         };

//         fetch("http://localhost:5555/itemscart", {
//             method: "POST",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify(newItem)
//         })
//         .then(resp => resp.json())
//         .then(data => {
//             alert(`${data.name} added to cart!`);
//         })
//         .catch(error => console.error("Error adding to cart.", error))
//     };

//     const handleDelete = () => {
//         fetch(`http://localhost:5555/groceries/${id}`, {
//             method: "DELETE"
//         })
//         .then(() => {
//             alert(`${name} removed from groceries.`);
//             // You'll need a state update in the parent component to remove it visually
//         });
//     };


//     return (
//         <div className="grocery-card">
//             <h4>{name}</h4>
//             <p>Category: {description}</p>
//             <div class="quantity-wrapper">
//                 <label for="quantity">Quantity:</label>
               
//                 <input
//                     type="number"
//                     value={quantity}
//                     onChange={(e) => setQuantity(parseInt(e.target.value))}
//                     class="quantity-box"
//                     min="1"
//                 />
//             </div>
//             <div style={{ marginTop: "8px" }}>
//                 <button onClick={handleAddToCart}>Add to Cart</button>
//                 <button onClick={handleDelete} style={{ marginLeft: "10px", color: "red" }}>Remove</button>
//             </div>
//         </div>
//     );
// }

// export default GroceryCards;


import React, { useState } from "react";

function GroceryCards({ grocery }) {
    const { id, name, description } = grocery;
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        const newItem = {
            name,
            description,
            quantity,
            grocery_id: id,
            user_id: 1 // TEMP: Replace with real user ID later
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
            <div style={{ marginTop: "8px" }}>
                <button onClick={handleAddToCart} className="cart-action">Add to Cart</button>
                <button onClick={handleDelete} className="cart-action" style={{ marginLeft: "10px", color: "red" }}>Remove</button>
            </div>
        </div>
    );
}

export default GroceryCards;
