import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="page" style={{ padding: "30px" }}>
      <h2>Welcome, {user?.email}</h2>
      <p>Role: {user?.role}</p>

      <div style={{ marginTop: 20, display: "flex", gap: "10px" }}>
        <Link to="/items">
          <button className="primary-btn">Items</button>
        </Link>
        <Link to="/profile">
          <button className="primary-btn">Profile</button>
        </Link>
        {user?.role === "admin" && (
          <Link to="/admin">
            <button className="primary-btn">Admin Panel</button>
          </Link>
        )}
        <button className="secondary-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
