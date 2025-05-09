import React, { useState } from "react";


function GroceryForm({ onNewGrocery }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        quantity: 1,
        image: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:5555/groceries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then(newItem => {
            onNewGrocery(newItem);
            setFormData({ name: "", description: "", quantity: 1, image: "" });
        });
    };

    return (
        <form onSubmit={handleSubmit} className="grocery-form">
            <h2>Don't see an item you want?</h2>
            <h2>Add a Grocery Item Here</h2>

            <input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="e.g. Hamburger Buns" 
                required 
            />

            <select
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
            >
                <option value="">Select Category</option>
                <option value="Bread">Bread</option>
                <option value="Cheese">Cheese</option>
                <option value="Condiment">Condiment</option>
                <option value="Dairy">Dairy</option>
                <option value="Dessert">Dessert</option>
                <option value="Eggs">Eggs</option>
                <option value="Fruit">Fruit</option>
                <option value="Household">Household</option>
                <option value="Meat">Meat</option>
                <option value="Pizza">Pizza</option>
                <option value="Vegetable">Vegetable</option>
                <option value="Deli Item">Deli Item</option>
                <option value="Other">Other</option>
            </select>

            <button type="submit" className="action-button">Add Item</button>
        </form>
    );
}

export default GroceryForm;
