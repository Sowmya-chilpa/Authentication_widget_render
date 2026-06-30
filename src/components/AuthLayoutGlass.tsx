import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import background from "../assets/glassybackground.png";

const AuthLayoutGlass = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="no-scrollbar relative z-10 w-full max-w-md max-h-[95vh] overflow-y-auto rounded-2xl border border-white/30 bg-white/70 backdrop-blur-xl shadow-xl p-5 opacity-80">

        <div className="flex flex-col items-center mb-2">
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-blue-500 mb-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M12 6c-1.5-1.3-4-2-7-2v13c3 0 5.5.7 7 2 1.5-1.3 4-2 7-2V4c-3 0-5.5.7-7 2Z" />
            <path d="M12 6v13" />
          </svg>

          <h1 className="text-xl font-extrabold text-slate-900">
            BOOK <span className="text-blue-500">RENTAL</span>
          </h1>

          <p className="text-slate-500 text-xs mt-0.5">
            Read more. Rent easily.
          </p>
        </div>

        <div className="flex justify-center gap-10 border-b border-slate-300/40 mb-2">
          <button
            onClick={() => setIsLogin(true)}
            className={`pb-1.5 text-sm font-medium transition border-b-2 ${
              isLogin
                ? "text-blue-600 border-blue-600"
                : "text-slate-500 border-transparent hover:text-slate-700"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`pb-1.5 text-sm font-medium transition border-b-2 ${
              !isLogin
                ? "text-blue-600 border-blue-600"
                : "text-slate-500 border-transparent hover:text-slate-700"
            }`}
          >
            Register
          </button>
        </div>

        <div className="grid">
          <div
            className={`col-start-1 row-start-1 ${
              isLogin
                ? "opacity-100 visible"
                : "opacity-0 invisible pointer-events-none"
            }`}
          >
            <Login setIsLogin={setIsLogin} />
          </div>

          <div
            className={`col-start-1 row-start-1 ${
              !isLogin
                ? "opacity-100 visible"
                : "opacity-0 invisible pointer-events-none"
            }`}
          >
            <Register isLogin={isLogin} setIsLogin={setIsLogin} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthLayoutGlass;