import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // const user = storedUsers.find(
    //   (u) => u.email === email && u.password === password
    // );
    console.log(email, password);

    //   if (user && user.isAdmin) {
    //     // Accesso come admin
    //     alert("Accesso effettuato come admin!");
    //     localStorage.setItem("isAdmin", true);
    //   } else if (user) {
    //     // Accesso come utente normale
    //     alert("Accesso effettuato!");
    //     // Esegui il reindirizzamento alla dashboard o alla pagina utente
    //   } else {
    //     // Accesso negato
    //     alert("Credenziali non valide. Per favore, riprova.");
    //   }
    //   // navigate("/");
  };

  return (
    <Container fluid>
      <div className="form-container">
        <h2>Login</h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Inserisci email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Inserisci password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleLogin}>
            Accedi
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
