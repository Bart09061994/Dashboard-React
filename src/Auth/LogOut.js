import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userEmail");

    navigate("/login");
  };

  return (
    <Button variant="danger" onClick={handleLogout}>
      LogOut <FaSignOutAlt />
    </Button>
  );
};

export default LogOut;
