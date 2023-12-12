import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const { setUserInfo } = useContext(UserContext);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const userData = await response.json();
      alert("Login successful! 😊");
      setRedirect(true);
      setUserInfo(userData);
    } catch (err) {
      alert("Login failed! ☹️");
    }
  }

  if (redirect) {
    return navigate("/");
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-20">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form action="" className="max-w-md mx-auto" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="your@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link to={"/register"} className="underline text-red-800 ml-2">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
