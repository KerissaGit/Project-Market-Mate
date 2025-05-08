// import React, { useState } from "react";


// function Deli() {
//     const [bread, setBread] = useState("");
//     const [cheese, setCheese] = useState("");
//     const [meat, setMeat] = useState("");

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newDeli = {
//             bread_type: bread,
//             cheese_type: cheese,
//             meat_type: meat,
//             quantity: 1
//         };

//         fetch("http://localhost:5555/deli", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             credentials: "include",
//             body: JSON.stringify(newDeli),
//         })
//         .then((resp) => {
//             if (!resp.ok) throw new Error("Failed to create deli item.");
//             return resp.json();
//         })
//         .then((data) => {
//             alert(`${data.name} created and added to cart!`);
//             setBread(""); setCheese(""); setMeat("");
//         })
//         .catch((error) => {
//             console.error("Error creating sandwich/wrap:", error);
//             alert("Failed to create sandwich/wrap");
//         });
//     };

//     return (
//         <div className="deli-form grocery-form">
//             <h3>Create Custom Sandwich/Wrap</h3>
//             <form onSubmit={handleSubmit}>
//                 <label>Bread/Wrap Type:</label>
//                 <select value={bread} onChange={(e) => setBread(e.target.value)} required>
//                     <option value="">Select Bread/Wrap</option>
//                     <option value="Wheat">Wheat</option>
//                     <option value="White">White</option>
//                     <option value="Spinach Wrap">Spinach Wrap</option>
//                 </select>

//                 <label>Meat Type:</label>
//                 <select value={meat} onChange={(e) => setMeat(e.target.value)} required>
//                     <option value="">Select Meat</option>
//                     <option value="Turkey">Turkey</option>
//                     <option value="Ham">Ham</option>
//                     <option value="Chicken">Chicken</option>
//                 </select>

//                 <label>Cheese Type:</label>
//                 <select value={cheese} onChange={(e) => setCheese(e.target.value)} required>
//                     <option value="">Select Cheese</option>
//                     <option value="Cheddar">Cheddar</option>
//                     <option value="Swiss">Swiss</option>
//                     <option value="Provolone">Provolone</option>
//                 </select>

//                 <button type="submit" className="action-button">Add Custom Item to Cart</button>
//             </form>
//         </div>
//     );
// }

// export default Deli;



// // import React, { useState } from "react";
// // import { useOutletContext } from "react-router-dom";

// // function Deli() {
// //   const { setUser } = useOutletContext();
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     bread: "",
// //     meats: ""
// //   });

// //   const [error, setError] = useState(null);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     fetch('/me', { credentials: 'include' })
// //       .then(res => res.ok ? res.json() : Promise.reject())
// //       .then(user => {
// //         const payload = { ...formData, user_id: user.id };

// //         return fetch("/deli", {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           credentials: "include",
// //           body: JSON.stringify(payload)
// //         });
// //       })
// //       .then(res => {
// //         if (!res.ok) throw new Error("Failed to create deli item.");
// //         return res.json();
// //       })
// //       .then(data => {
// //         setError(null);
// //         alert("Deli item added!");
// //         setFormData({ name: "", bread: "", meats: "" });
// //       })
// //       .catch(err => setError("Error creating sandwich/wrap: " + err.message));
// //   };

// //   return (
// //     <div>
// //       <h2>Create Your Deli Sandwich</h2>
// //       {error && <p style={{ color: "red" }}>{error}</p>}
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           name="name"
// //           placeholder="Name"
// //           value={formData.name}
// //           onChange={handleChange}
// //         />
// //         <input
// //           name="bread"
// //           placeholder="Bread Type"
// //           value={formData.bread}
// //           onChange={handleChange}
// //         />
// //         <input
// //           name="meats"
// //           placeholder="Meats"
// //           value={formData.meats}
// //           onChange={handleChange}
// //         />
// //         <button type="submit">Add Sandwich</button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Deli;




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

        const sandwichName = `${meat} & ${cheese} on ${bread}`;

        const deliPayload = {
            bread_type: bread,
            cheese_type: cheese,
            meat_type: meat,
            quantity: 1,
            user_id: loggedInUser.id
        };

        fetch("http://localhost:5555/deli", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(deliPayload),
        })
        .then((resp) => {
            if (!resp.ok) throw new Error("Failed to create deli item.");
            return resp.json();
        })
        .then((deliData) => {
            // Create grocery item
            const groceryPayload = {
                name: sandwichName,
                description: "Deli Item",
                quantity: 1
            };

            return fetch("http://localhost:5555/groceries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(groceryPayload)
            }).then((res) => {
                if (!res.ok) throw new Error("Failed to add item to groceries.");
                return res.json();
            });
        })
        .then((groceryItem) => {
            // Add to items cart
            const cartPayload = {
                name: groceryItem.name,
                description: groceryItem.description,
                quantity: 1,
                grocery_id: groceryItem.id,
                user_id: loggedInUser.id
            };

            return fetch("http://localhost:5555/itemscart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cartPayload)
            });
        })
        .then((res) => {
            if (!res.ok) throw new Error("Failed to add item to cart.");
            alert(`${sandwichName} created and added to cart!`);
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
                    <option value="Wheat">Wheat</option>
                    <option value="White">White</option>
                    <option value="Spinach Wrap">Spinach Wrap</option>
                </select>

                <label>Meat Type:</label>
                <select value={meat} onChange={(e) => setMeat(e.target.value)} required>
                    <option value="">Select Meat</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Ham">Ham</option>
                    <option value="Chicken">Chicken</option>
                </select>

                <label>Cheese Type:</label>
                <select value={cheese} onChange={(e) => setCheese(e.target.value)} required>
                    <option value="">Select Cheese</option>
                    <option value="Cheddar">Cheddar</option>
                    <option value="Swiss">Swiss</option>
                    <option value="Provolone">Provolone</option>
                </select>

                <button type="submit" className="action-button">Add Custom Item to Cart</button>
            </form>
        </div>
    );
}

export default Deli;
