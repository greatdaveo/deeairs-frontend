import React from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-20">
        <h1 className="text-4xl text-center mb-4">Kindly register here!</h1>
        <form action="" className="max-w-md mx-auto">
          <input type="text" placeholder="John Doe" />
          <input type="email" placeholder="your@gmail.com" />
          <input type="password" placeholder="Enter your Password" />
          <button className="btn">Login</button>
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
