import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => navigate("/"));
  }, [navigate]);

  return user ? (
    <div className="p-4">
      <h2>Welcome, {user.username}!</h2>
      <button
        onClick={() =>
          axios
            .post(
              "http://localhost:5000/auth/logout",
              {},
              { withCredentials: true }
            )
            .then(() => navigate("/"))
        }
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Logout
      </button>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Dashboard;
