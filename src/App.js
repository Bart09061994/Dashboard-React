import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";
import SidebarLeft from "./components/Sidebar/SidebarLeft";
import { SidebarLeftData } from "./components/Sidebar/SidebarLeftData";
import SidebarRight from "./components/Sidebar/SidebarRight";
import StorePage from "./pages/StorePage";
import Login from "./Auth/Login";
import Registrati from "./Auth/Registrati";
import "./App.css";
function App() {
  return (
    <>
      <Router>
        <Navbar />

        <SidebarLeft SidebarLeftData={SidebarLeftData} />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store/:storeId" element={<StorePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Registrati />} />
          </Routes>
        </div>

        <SidebarRight />
      </Router>
    </>
  );
}

export default App;
