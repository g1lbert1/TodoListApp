import { useState } from "react";
import axios from "axios";

export default function Login({ onAuth }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const endpoint = isRegistering
        ? "http://localhost:3000/users/register"
        : "http://localhost:3000/users/login";

      const res = await axios.post(endpoint, form);

      if (!isRegistering) {
        const token = res.data.token;
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        onAuth(token);
      } else {
        setMessage("Registered successfully. You can now log in.");
        setIsRegistering(false);
      }

    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "3rem auto" }}>
      <h2>{isRegistering ? "Create an Account" : "Login"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={form.username}
          required
          style={{ display: "block", width: "100%", marginBottom: 10 }}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          required
          style={{ display: "block", width: "100%", marginBottom: 10 }}
        />

        <button type="submit" className="hover:cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md">
          {isRegistering ? "Register" : "Login"}
        </button>
      </form>

      {message && <p style={{ color: "red" }}>{message}</p>}

      <p style={{ marginTop: 10 }}>
        {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
        >
          {isRegistering ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
}

