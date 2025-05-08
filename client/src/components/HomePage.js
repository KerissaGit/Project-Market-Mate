import React from "react";
import { useOutletContext } from "react-router-dom";
import Auth from "./Auth";

function HomePage() {
  const { user, setUser } = useOutletContext();

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to Market Mate!</h1>
      <p className="homepage-subtitle">
        Market Mate is your all-in-one solution for managing grocery lists and crafting custom deli sandwiches. Start by signing up or logging in to unlock your personalized cart. From there, browse our grocery items, add what you need, or visit the deli to build your perfect sandwich — which gets added to your list automatically. Keep track of everything in your cart, and enjoy a smooth, intuitive shopping experience from start to finish!
      </p>

      {user ? (
        <div className="welcome-message">
          <p className="homepage-welcome">Welcome back, <strong>{user.username}</strong>!</p>
        </div>
      ) : (
        <Auth setUser={setUser} />
      )}
    </div>
  );
}

export default HomePage;
