import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return alert("Enter email");
    login(email, role);
  };

  return (
    <div
      className="page"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f4f6f8",
      }}
    >
      <form
        className="modal"
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          background: "white",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Recover Login</h2>

        <input
          type="email"
          placeholder="Campus email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
        >
          <option value="user">Student / Staff</option>
          <option value="admin">Admin</option>
        </select>

        <button
          className="primary-btn"
          type="submit"
          style={{ padding: "10px", borderRadius: "6px", cursor: "pointer" }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
