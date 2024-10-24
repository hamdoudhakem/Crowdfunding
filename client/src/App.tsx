import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

export const App = () => {
  return (
    <div className="relative sm:mt-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sl:flex hidden mr-10 relative">Sidebar</div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        NavBar
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};
