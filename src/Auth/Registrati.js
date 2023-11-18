import React from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword, registerUser } from "./SignInSlice";
import { useNavigate } from "react-router-dom";

const Registrati = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.signIn.email);
  const password = useSelector((state) => state.signIn.password);
  const navigate = useNavigate();

  const handleRegistrati = () => {
    dispatch(registerUser({ email, password }));
    navigate("/login");
  };

  return (
    <div className="form-container">
      <h2>Registrati</h2>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Inserisci email"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Inserisci password"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleRegistrati}>
          Registrati
        </Button>
      </Form>
    </div>
  );
};

export default Registrati;
