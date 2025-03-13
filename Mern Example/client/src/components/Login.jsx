import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/auth";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch user profile on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  // Register User
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/register`, { username, password });
      setMessage("Registration successful! Please log in.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed.");
    }
  };

  // Login User
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { username, password },
        { withCredentials: true }  // 🔥 This ensures cookies are sent/received
      );

      console.log(response);
      

    //   const { token, user } = data;
    //   //   console.log({ token, user });

    //   localStorage.setItem("token", token);
      setMessage("Login successful!");
      fetchProfile(); // Fetch user profile after login
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed.");
    }
  };

  // Fetch Logged-in User
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/me`,
         { withCredentials: true }
      );
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  };

  // Logout User
  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      setUser(null);
      setMessage("Logged out successfully.");
    } catch {
      setMessage("Logout failed.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        weight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
      }}
    >
      <div
        style={{
          //   width: "400px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Authentication System</h2>

        {message && <p>{message}</p>}

        {!user ? (
          <>
            {/* Register Form */}
            <form onSubmit={handleRegister} style={{ marginBottom: "20px" }}>
              <h3>Register</h3>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: "90%",
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "90%",
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  padding: "10px",
                  width: "100%",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Register
              </button>
            </form>

            {/* Login Form */}
            <form onSubmit={handleLogin}>
              <h3>Login</h3>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: "90%",
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "90%",
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "10px",
                  width: "100%",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Login
              </button>
            </form>
          </>
        ) : (
          <>
            {/* User Profile & Logout */}
            <h3>Welcome, {user.username}!</h3>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                padding: "10px",
                width: "100%",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "15px",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
