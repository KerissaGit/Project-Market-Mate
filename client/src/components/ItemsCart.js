import React, { useEffect, useState } from "react";


function ItemsCart() {
    const [cartItems, setCartItems] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});

    useEffect(() => {
        fetch("http://localhost:5555/itemscart/user/1")
            .then(resp => resp.json())
            .then(data => {
                setCartItems(data);
                const checkedInit = {};
                data.forEach(item => checkedInit[item.id] = false);
                setCheckedItems(checkedInit);
            });
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
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity: newQuantity })
        })
        .then(resp => resp.json())
        .then(updatedItem => {
            setCartItems(cartItems.map(item => item.id === id ? updatedItem : item));
        });
    };

    const toggleChecked = (id) => {
        setCheckedItems({ ...checkedItems, [id]: !checkedItems[id] });
    };

    return (
        <div className="items-cart">
            <h2>Items in Cart</h2>
            <div className="cart-scroll">
                {cartItems.map(item => (
                    <div key={item.id} className={`cart-item-row ${checkedItems[item.id] ? "checked" : ""}`}>
                        <input
                            type="checkbox"
                            checked={checkedItems[item.id] || false}
                            onChange={() => toggleChecked(item.id)}
                            className="item-checkbox"
                        />
                        <div className="item-details">
                            <h4>{item.name}</h4>
                            <div className="quantity-wrapper">
                                <label htmlFor={`item-${item.id}`}>Qty:</label>
                                <input
                                    id={`item-${item.id}`}
                                    type="number"
                                    value={item.quantity}
                                    className="quantity-box"
                                    onChange={(e) => handleUpdate(item.id, parseInt(e.target.value))}
                                />
                            </div>
                        </div>
                        <button className="remove-button" onClick={() => handleRemove(item.id)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ItemsCart;
