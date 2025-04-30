import React, { useState } from "react";

function Deli() {
    const [bread, setBread] = useState("");
    const [cheese, setCheese] = useState("");
    const [meat, setMeat] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();

        const newDeli = {
            bread_type: bread,
            cheese_type: cheese,
            meat_type: meat,
            quantity: 1
        };


        fetch("http://localhost:5555/deli", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(newDeli),
        })
        .then((resp) => {
            if (!resp.ok) throw new Error("Failed to create deli item.");
            return resp.json();
        })
        .then((data) => {
            // alert(`Custom ${data.meat_type} and ${data.cheese_type} on ${data.bread_type} created and added to cart!`);
            alert(`${data.name} created and added to cart!`);
            setBread("");
            setCheese("");
            setMeat("");
        })
        .catch((error) => {
            console.error("Error creating sandwich/wrap:", error);
            alert("Failed to create sandwich/wrap");
        });
    };

    
    return (
        <div className="deli-form">
            <h3>Create Custom Sandwich/Wrap</h3>
            <form onSubmit={handleSubmit}>
                <label>Bread Type:</label>
                <select value={bread} onChange={(e) => setBread(e.target.value)} required>
                    <option value="">Select Bread</option>
                    <option value="Wheat">Wheat</option>
                    <option value="White">White</option>
                    <option value="Spinach Wrap">Spinach Wrap</option>
                </select>

                <label>Cheese Type:</label>
                <select value={cheese} onChange={(e) => setCheese(e.target.value)} required>
                    <option value="">Select Cheese</option>
                    <option value="Cheddar">Cheddar</option>
                    <option value="Swiss">Swiss</option>
                    <option value="Provolone">Provolone</option>
                </select>

                <label>Meat Type:</label>
                <select value={meat} onChange={(e) => setMeat(e.target.value)} required>
                    <option value="">Select Meat</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Ham">Ham</option>
                    <option value="Chicken">Chicken</option>
                </select>

                <button type="submit">Add Custom Item to Cart</button>
            </form>
        </div>
    );
}


export default Deli;