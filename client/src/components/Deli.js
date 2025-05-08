import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Deli() {
    const { loggedInUser } = useOutletContext();

    const [bread, setBread] = useState("");
    const [cheese, setCheese] = useState("");
    const [meat, setMeat] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!loggedInUser) {
            setError("User must be logged in to create a custom item.");
            return;
        }

        const deliPayload = {
            bread_type: bread,
            cheese_type: cheese,
            meat_type: meat,
            quantity: 1
        };

        fetch("http://localhost:5555/deli", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // important for session
            body: JSON.stringify(deliPayload),
        })
        .then((resp) => {
            if (!resp.ok) throw new Error("Failed to create custom deli item.");
            return resp.json();
        })
        .then((createdGrocery) => {
            alert(`${createdGrocery.name} created and added to cart!`);
            setBread(""); setCheese(""); setMeat("");
            setError(null);
        })
        .catch((err) => {
            console.error("Error:", err);
            setError(err.message);
        });
    };

    return (
        <div className="deli-form grocery-form">
            <h3>Create Custom Sandwich/Wrap</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Bread/Wrap Type:</label>
                <select value={bread} onChange={(e) => setBread(e.target.value)} required>
                    <option value="">Select Bread/Wrap</option>
                    <option value="Sourdough">Sourdough Bread</option>
                    <option value="Wheat">Wheat Bread</option>
                    <option value="White">White Bread</option>
                    <option value="Spinach Wrap">Spinach Wrap</option>
                    <option value="Tomato Basil Wrap">Tomato Basil Wrap</option>
                    <option value="Gluten-Free Wrap">Gluten-Free Wrap</option>
                </select>

                <label>Meat Type:</label>
                <select value={meat} onChange={(e) => setMeat(e.target.value)} required>
                    <option value="">Select Meat</option>
                    <option value="Chicken Breast">Chicken Breast</option>
                    <option value="Honey Ham">Honey Ham</option>
                    <option value="Roast Beef">Roast Beef</option>
                    <option value="Salami">Salami</option>
                    <option value="Turkey Breast">Turkey Breast</option>
                    <option value="Tempeh">Tempeh</option>
                </select>

                <label>Cheese Type:</label>
                <select value={cheese} onChange={(e) => setCheese(e.target.value)} required>
                    <option value="">Select Cheese</option>
                    <option value="No Cheese">No Cheese</option>
                    <option value="Cheddar">Cheddar</option>
                    <option value="Mozzarella">Mozzarella</option>
                    <option value="Provolone">Provolone</option>
                    <option value="Pepper Jack">Pepper Jack</option>
                    <option value="Swiss">Swiss</option>
                </select>

                <button type="submit" className="action-button">Add Custom Item to Cart</button>
            </form>
        </div>
    );
}

export default Deli;

