import React, { useState } from "react";
import { Nav, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as BiIcons from "react-icons/bi";
export default function SidebarLeft({ SidebarLeftData }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="sidebar-left">
        <Nav.Link className="d-md-none" onClick={handleShow}>
          <BiIcons.BiMenu />
        </Nav.Link>
        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="start"
          className="d-md-none">
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body>
            <Nav>
              {SidebarLeftData.map((item, index) => (
                <Nav.Item key={index}>
                  <Nav.Link
                    as={Link}
                    to={item.path}
                    className="text-light"
                    onClick={handleClose}>
                    {item.icon}
                    <span className="nav-text">{item.title}</span>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>

        <Nav
          className="bg-dark text-light flex-grow-1 d-none d-md-block"
          style={{
            position: "fixed",
            width: "180px",
            left: "0",
            top: "35px",
            zIndex: "1000",
            borderRight: "1px solid #162636",
            height: "100%",
          }}>
          {SidebarLeftData.map((item, index) => (
            <Nav.Item key={index}>
              <Nav.Link
                as={Link}
                to={item.path}
                className="text-light"
                style={{
                  borderBottom: "1px solid #ddd",
                  color: "#7b7a7e",
                  padding: "15px 20px",
                  margin: "0",
                  fontSize: "15px",
                }}>
                {item.icon}
                <span className="nav-text">{item.title}</span>
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
    </>
  );
}
