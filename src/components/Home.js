import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modale from "./Modal/Modale";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [stores, setStores] = useState([]);
  const [showDeleteAllButton, setShowDeleteAllButton] = useState(false);
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    setShowDeleteAllButton(stores.length >= 2);
  }, [stores]);

  const deleteAllStores = () => {
    localStorage.removeItem("stores");
    setStores([]);
    setShowDeleteAllButton(false);
  };

  return (
    <>
      <h2>Lista degli Store</h2>
      {isAdmin && (
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Crea Nuovo Store
        </Button>
      )}

      {showDeleteAllButton && isAdmin && (
        <Button variant="danger" onClick={deleteAllStores}>
          Elimina Tutti gli Store
        </Button>
      )}
      <Modale
        stores={stores}
        setStores={setStores}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
}

export default Home;
