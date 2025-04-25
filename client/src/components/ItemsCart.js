import React, { useEffect, useState } from "react";

// import Groceries from "./Groceries";

//This file will need to be updated after the User/Auth is working and established


function ItemsCart(){
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => { 
        fetch("http://localhost:5555/itemscart/user/1") //FIX ME!!! ADJUST FOR USERS LOGIN 
            .then(resp => resp.json())
            .then(data => setCartItems(data));
    }, []);

    const handleRemove = (id) => {
        fetch(`http://localhost:5555/itemscart/${id}`, {
            method: "DELETE"
        }).then(() => {
            setCartItems(cartItems.filter(item => item.id !== id));
        });
    };

    const handleUpdate = (id, newQuantity) => {
        fetch(`http://localhost:5555/itemscart/${id}`, {
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
                            onChange={(e) => handleUpdate(item.id, parseInt(e.target.value))}
                        />
                    </p>
                    <button onClick={() => handleRemove(item.id)}>Remove</button>
                </div>
            ))}
            
        </div>
    )
}

export default ItemsCart;