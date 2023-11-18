import React from "react";
import { Link } from "react-router-dom";
import { Navbar as BootstrapNavbar } from "react-bootstrap";
import LogOut from "../../Auth/LogOut";

function Navbar() {
  return (
    <>
      <BootstrapNavbar
        bg="dark"
        expand="lg"
        style={{
          position: "fixed",
          zIndex: "1000",
          width: "300vh",
          height: "7%",
        }}>
        <Link
          to="/"
          expand="lg"
          className="navbar-brand-light text-center text-white">
          Dashboard React
        </Link>
        <div style={{ marginLeft: "5rem" }}>
          <LogOut />
        </div>
      </BootstrapNavbar>
    </>
  );
}

export default Navbar;
