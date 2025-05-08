# 🛒 🥪 Market Mate 🧑‍🌾 ✅

Welcome to **Market Mate** — a full-stack web application for creating and managing your grocery list, building custom deli sandwiches, and tracking items in your personal cart. This app allows users to sign up, log in, browse a catalog of grocery and deli items, create custom sandwiches, and manage everything in a personalized, user-specific cart.

This project showcases modular component-based development with React on the frontend and a RESTful Flask backend. Data is persisted with SQLAlchemy and user sessions are managed with secure session cookies and Flask-Bcrypt for authentication.

---

## 🎯 Features

- ✅ **User Authentication**: Sign up and log in securely. Each user has a unique cart and personalized experience.  
- 📝 **Grocery Checklist**: Add, view, and manage grocery items categorized by type (e.g., Dairy, Meat, Vegetables, etc.).  
- 🥪 **Custom Deli Builder**: Choose your bread, cheese, and meat to build and save custom sandwiches — automatically added to your grocery list and your cart.  
- 🛍️ **Personalized Cart**: View all the grocery and deli items you've added, organized under your account and check off or remove items as you go.  
- 🧭 **Protected Routes**: Users must be logged in to access cart or deli item creation. Routing is handled securely with React Router and route protection.  
- 📦 **Database Management**: Backend supports robust CRUD operations for users, groceries, deli items, and the cart.  
- 🎨 **Responsive UI**: A clean, accessible, and styled interface with navigation, forms, and dynamically rendered cards using modular React components and centralized CSS.

---

## 🛠️ Technologies Used

### Frontend

- React  
- React Router DOM  
- Formik + Yup (for forms and validation)  
- CSS (centralized in `index.css`)

### Backend

- Python  
- Flask  
- Flask-RESTful  
- Flask-CORS  
- Flask-Bcrypt  
- Flask-SQLAlchemy  
- SQLAlchemy-Serializer  
- Flask-Migrate  
- Faker (for seeding)

---

## ⚙️ Environment Setup

### Backend Setup

1. Clone the project and navigate into the backend directory:
   ```bash
   cd server

    Install dependencies:

pipenv install
pipenv shell

Run the server:

python app.py

(Optional) If using migrations:

flask db init
flask db migrate -m "Initial migration"
flask db upgrade head

Seed your database:

    python seed.py

Frontend Setup

    Navigate to the client directory:

cd client

Install frontend dependencies:

npm install
npm install formik
npm install yup
npm install axios
npm install @fortawesome/fontawesome-free

Run the React frontend:

    npm start

The React app should be available at http://localhost:3000 and is set to proxy API requests to Flask on http://localhost:5555.
🗃️ Directory Structure Highlights

project-root/
│
├── server/
│   ├── app.py
│   ├── config.py
│   ├── models.py
│   ├── seed.py
│   ├── migrations/
│   └── instance/app.db
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css

🔐 User Flow Summary

    Sign Up / Log In: Users can register or sign in. Sessions are tracked with cookies.

    Home Page: Accessible to all users. Provides a welcome view and links.

    Groceries Page: View all items. Logged-in users can add groceries to cart.

    Deli Builder: Logged-in users create custom sandwiches — added to grocery + cart automatically.

    Cart Page: Each user sees only their cart. Items can be reviewed here.

    Logout: Ends the session and redirects to the home page.

🌱 Seeding Example (Faker)

The backend includes a seed.py script using Faker to populate test users, groceries, and sample deli combinations for easy development and demo.

🙏 Acknowledgments

Created and developed by Kerissa. Thank you to the teachers, students and staff at Flatiron school for helping me acheive my first solo project.

📜 License

This project is licensed under the MIT License.
