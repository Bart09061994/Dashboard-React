import React, { useEffect, useState } from "react";
import { Nav, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as BiIcons from "react-icons/bi";
import "./SidebarRight.css";
function SidebarRight() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [stores, setStores] = useState([]);
  useEffect(() => {
    const storedStores = JSON.parse(localStorage.getItem("stores")) || [];
    setStores(storedStores);
  }, []);
  return (
    <>
      <div className="sidebar-right">
        <Nav.Link className="d-md-none" onClick={handleShow}>
          <BiIcons.BiMenu />
        </Nav.Link>

        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
          className="d-md-none">
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body>
            <Nav>
              <Nav
                className="bg-dark text-light flex-grow-1 d-none d-md-block"
                style={{
                  position: "fixed",
                  right: "0",
                  top: "35px",
                  zIndex: "1000",
                  borderLeft: "1px solid #162636",
                  height: "100%",
                }}>
                {stores &&
                  stores.map((store, index) => (
                    <Nav.Item key={index}>
                      <Nav.Link
                        as={Link}
                        to={`/store/${index}`}
                        className="text-light"
                        style={{
                          borderBottom: "1px solid #ddd",
                          color: "#7b7a7e",
                          padding: "15px 20px",
                          margin: "0",
                          fontSize: "15px",
                          borderLeft: "1px solid #162636",
                        }}>
                        <BiIcons.BiSolidStore />
                        {store.name}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
              </Nav>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>

        <Nav
          className="bg-dark text-light flex-grow-1 d-none d-md-block"
          style={{
            position: "fixed",
            width: "180px",
            right: "0",
            top: "35px",
            zIndex: "1000",
            borderLeft: "1px solid #162636",
            height: "100%",
          }}>
          {stores &&
            stores.map((store, index) => (
              <Nav.Item key={index}>
                <Nav.Link
                  as={Link}
                  to={`/store/${index}`}
                  className="text-light"
                  style={{
                    borderBottom: "1px solid #ddd",
                    color: "#7b7a7e",
                    padding: "15px 20px",
                    margin: "0",
                    fontSize: "15px",
                    borderLeft: "1px solid #162636",
                  }}>
                  <BiIcons.BiSolidStore />
                  {store.name}
                </Nav.Link>
              </Nav.Item>
            ))}
        </Nav>
      </div>
    </>
  );
}

export default SidebarRight;
