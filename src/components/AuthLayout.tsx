import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import booksImage from "../assets/books.jpg";

const AuthLayout = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl shadow-slate-300/50 overflow-hidden grid md:grid-cols-[1fr_1.05fr]">

        {/* Left Side */}
        <div className="relative hidden md:block">
          <img
            src={booksImage}
            alt="Books"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

          <div className="relative z-10 h-full flex flex-col justify-end p-10">
            <span className="text-xs font-semibold tracking-[0.2em] text-indigo-300 uppercase mb-3">
              Welcome
            </span>

            <h1 className="text-5xl font-bold text-white leading-tight">
              Book Rental
            </h1>

            <p className="mt-4 text-base text-gray-200 max-w-md leading-relaxed">
              Discover thousands of books, rent your favourites and enjoy
              reading anytime, anywhere.
            </p>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isLogin
                    ? "bg-white text-slate-900 shadow-lg"
                    : "border border-white/40 text-white hover:bg-white/10"
                }`}
              >
                Login
              </button>

              <button
                onClick={() => setIsLogin(false)}
                className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  !isLogin
                    ? "bg-white text-slate-900 shadow-lg"
                    : "border border-white/40 text-white hover:bg-white/10"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="grid p-8 lg:p-12">
          {/* Login */}
          <div
            className={`col-start-1 row-start-1 flex items-center justify-center transition-all duration-300 ${
              isLogin
                ? "opacity-100 visible"
                : "opacity-0 invisible pointer-events-none"
            }`}
          >
            <div className="w-full max-w-md">
              <Login setIsLogin={setIsLogin} />
            </div>
          </div>

          {/* Register */}
          <div
            className={`col-start-1 row-start-1 flex items-center justify-center transition-all duration-300 ${
              !isLogin
                ? "opacity-100 visible"
                : "opacity-0 invisible pointer-events-none"
            }`}
          >
            <div className="w-full max-w-md">
              <Register
                isLogin={isLogin}
                setIsLogin={setIsLogin}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;