import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as BiIcons from "react-icons/bi";

import "./Modale.css";

export default function Modale({ stores, showModal, setStores, setShowModal }) {
  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [storeImage, setStoreImage] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    const storedStores = JSON.parse(localStorage.getItem("stores")) || [];
    setStores(storedStores);
  }, [setStores]);
  useEffect(() => {
    // Se abbiamo un indice selezionato, carica i dati dello store esistente
    if (selectedIndex !== null) {
      const selectedStore = stores[selectedIndex];
      setStoreName(selectedStore.name);
      setStoreDescription(selectedStore.description);
      setStoreImage(selectedStore.image);
    } else {
      // Resetta i campi quando stiamo creando un nuovo store
      setStoreName("");
      setStoreDescription("");
      setStoreImage("");
    }
  }, [selectedIndex, stores]);
  const handleClose = () => {
    setShowModal(false);
  };
  const handleCreateStore = () => {
    const newStore = {
      name: storeName,
      description: storeDescription,
      image: storeImage,
    };
    const updatedStores = [...stores, newStore];
    setStores(updatedStores);
    setShowModal(false);
    // Resetta i campi del modulo
    setStoreName("");
    setStoreDescription("");
    setStoreImage("");
    // Salva nel LocalStorage

    localStorage.setItem("stores", JSON.stringify(updatedStores));
  };

  const handleEditStore = () => {
    if (selectedIndex !== null) {
      // Verifica se un elemento è stato selezionato per la modifica
      const updatedStores = [...stores];
      updatedStores[selectedIndex] = {
        name: storeName,
        description: storeDescription,
        image: storeImage,
      };
      setStores(updatedStores);
      setShowModal(false); // Chiudi la modale di modifica
      // Resetta i campi del modulo
      setStoreName("");
      setStoreDescription("");
      setStoreImage("");
      localStorage.setItem("stores", JSON.stringify(updatedStores));
    }
  };
  const handleDeleteStore = (index) => {
    const updatedStores = stores.filter((_, i) => i !== index);
    setStores(updatedStores);
    localStorage.setItem("stores", JSON.stringify(updatedStores));
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        dialogClassName="modal-responsive">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedIndex !== null ? "Modifica Store" : "Crea Nuovo Store"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="storeName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il nome"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="storeDescription">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Inserisci la descrizione"
                value={storeDescription}
                onChange={(e) => setStoreDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="storeImage">
              <Form.Label>Immagine</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setStoreImage(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Chiudi
          </Button>
          {selectedIndex !== null ? (
            <Button variant="primary" onClick={handleEditStore}>
              Salva Modifiche
            </Button>
          ) : (
            <Button variant="primary" onClick={handleCreateStore}>
              Crea Store
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      {stores.map((store, index) => (
        <div key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Card>
            <Card.Img variant="top" src={store.image} alt={store.name} />
            <Card.Body>
              <Card.Title>{store.name}</Card.Title>
              <Card.Text>{store.description}</Card.Text>
              {isAdmin && (
                <Button variant="info">
                  <Link to={`/store/${index}`} className="text-decoration-none">
                    <BiIcons.BiSolidStore />
                    Vai allo Store
                  </Link>
                </Button>
              )}
              {isAdmin && (
                <Button
                  className="btn btn-warning"
                  onClick={() => {
                    setSelectedIndex(index);
                    setShowModal(true);
                  }}>
                  Modifica
                </Button>
              )}
              {isAdmin && (
                <Button
                  className="btn btn-danger"
                  onClick={() => handleDeleteStore(index)}>
                  Elimina
                </Button>
              )}
            </Card.Body>
          </Card>
        </div>
      ))}
    </>
  );
}
