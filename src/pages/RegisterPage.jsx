import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      alert("Registration successful! You can now enjoy the our services! 😊");
      console.log(response); 
    } catch (err) {
      console.log(err);
      alert("Registration failed! ☹️ Please try again!");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-20">
        <h1 className="text-4xl text-center mb-4">Kindly register here!</h1>
        <form onClick={handleSubmit} className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
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
          <button className="btn">Sign up</button>
          <div className="text-center py-2 text-gray-500">
            Do you have an account?
            <Link to={"/login"} className="underline text-red-800 ml-2">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
