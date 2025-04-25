import React, { useEffect, useState } from "react";

// import Groceries from "./Groceries";


function ItemsCart(){
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => { 
        fetch("http://localhost:5555/itemscarts/1") //FIX ME!!! ADJUST FOR USERS LOGIN <id:>
            .then(resp => resp.json())
            .then(data => setCartItems(data));
    }, []);

    const handleRemove = (id) => {
        fetch(`http://localhost:5555/itemscarts/${id}`, {
            method: "DELETE"
        }).then(() => {
            setCartItems(cartItems.filter(item => item.id !== id));
        });
    };

    const handleUpdate = (id, newQuantity) => {
        fetch(`http://localhost:5555/itemscarts/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ quantity: newQuantity})
            })
            .then(resp => resp.json())
            .then(updatedItem => {
                setCartItems(cartItems.map(item => item.id === id ? updatedItem : item));
            });
    };



    return(
        <div className="">
            <h2>Items in Cart</h2>
            {cartItems.map(item => (
                <div key={item.id} className="grocery-card">
                    <h4>{item.name}</h4>
                    <p>Quantity:
                        <input
                            type="number"
                            value={item.quantity}
                            OnChange={(e) => handleUpdate(item.id, parseInt(e.target.value))}
                        />
                    </p>
                    <button onClick={() => handleRemove(item.id)}>Remove</button>
                </div>
            ))}
            
        </div>
    )
}

export default ItemsCart;