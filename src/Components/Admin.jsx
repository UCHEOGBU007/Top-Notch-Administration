import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Adminsections/Dashboard";
import Styles from "../Css/Admin.module.css";
import { useState } from "react";

const Admin = () => {
  const [view, setView] = useState("dashboard");
  const navigate = useNavigate();

  return (
    <div className={Styles.container}>
      <nav>
        <div className={Styles.navContent}>
          <img src="/Logo.jpg" alt="Top Notch Logo" />
          <h2>Admin Panel</h2>
          <button onClick={() => setView("dashboard")}>Dashboard</button>
        </div>
        <button
          className={Styles.logoutButton}
          onClick={() => {
            if (window.confirm("Are you sure you want to log out?")) {
              navigate("/", { replace: true });
            }
          }}
        >
          Log out
          <span>
            <AiOutlineLogout />
          </span>
        </button>
      </nav>

      <div>
        <header>
          <h1>Welcome to the Admin Panel</h1>
        </header>
        {/* /*Main section for managing reservations and viewing stats */}

        {view === "dashboard" ? (
          <Dashboard />
        ) : (
          <p>Please select an option from the menu</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
