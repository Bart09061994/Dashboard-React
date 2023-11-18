import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

const StorePage = () => {
  const { storeId } = useParams(); // Ottieni il parametro storeId dalla URL
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const [showDeleteAllButton, setShowDeleteAllButton] = useState(false);
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  useEffect(() => {
    setShowDeleteAllButton(products.length >= 2);
  }, [products]);

  const [loading, setLoading] = useState(true);
  const deleteAllProducts = () => {
    localStorage.removeItem(`store_${selectedStore}_products`);
    setProducts([]);
    setShowDeleteAllButton(false);
  };
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  useEffect(() => {
    setSelectedStore(storeId);
  }, [storeId]);
  useEffect(() => {
    const storedProducts = localStorage.getItem(
      `store_${selectedStore}_products`
    );
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
    setLoading(false);
  }, [selectedStore]);

  const saveProduct = () => {
    if (
      !selectedStore ||
      !productName ||
      !productDescription ||
      !productImage ||
      !productPrice
    ) {
      alert("Compila tutti i campi e seleziona uno store!");
      return;
    }

    const newProduct = {
      id: generateUniqueId(),
      name: productName,
      description: productDescription,
      image: productImage,
      price: parseFloat(productPrice),
    };

    // Verifica se il prodotto è già presente nella lista
    const existingProductIndex = products.findIndex(
      (product) => product.id === selectedProduct.id
    );

    if (existingProductIndex !== -1) {
      // Se il prodotto esiste già, sostituiscilo con quello nuovo nella lista
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex] = newProduct;
      localStorage.setItem(
        `store_${selectedStore}_products`,
        JSON.stringify(updatedProducts)
      );
      setProducts(updatedProducts);
    } else {
      // Se il prodotto non esiste nella lista, aggiungilo
      const updatedProducts = [...products, newProduct];
      localStorage.setItem(
        `store_${selectedStore}_products`,
        JSON.stringify(updatedProducts)
      );
      setProducts(updatedProducts);
    }

    handleClose();
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setProductName(product.name);
    setProductDescription(product.description);
    setProductImage(product.image);
    setProductPrice(product.price);
    setSelectedStore(storeId); // Imposta lo store selezionato
    handleShow(); // Apri la modale per la modifica
  };

  const generateUniqueId = () => {
    return `${new Date().getTime()}-${Math.floor(Math.random() * 10000)}`;
  };

  const handleDelete = (product) => {
    const updatedProducts = products.filter(
      (productItem) => productItem !== product
    );
    localStorage.setItem(
      `store_${selectedStore}_products`,
      JSON.stringify(updatedProducts)
    );
    setProducts(updatedProducts);
    handleClose();
  };

  return (
    <>
      <div>
        <h2>Store Name</h2>
        {isAdmin && (
          <Button variant="primary" onClick={handleShow}>
            Aggiungi Prodotto
          </Button>
        )}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Aggiungi Prodotto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="productName">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci il nome del prodotto"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="productDescription">
                <Form.Label>Descrizione</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Inserisci la descrizione del prodotto"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="productImage">
                <Form.Label>URL Immagine</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci l'URL dell'immagine del prodotto"
                  value={productImage}
                  onChange={(e) => setProductImage(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="productPrice">
                <Form.Label>Prezzo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci il prezzo del prodotto"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="storeSelection">
                <Form.Label>Seleziona lo store</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedStore}
                  onChange={(e) => setSelectedStore(e.target.value)}>
                  <option value="">Seleziona uno store</option>
                  {Array.from({ length: 10 }, (_, index) => (
                    <option key={index} value={index}>
                      Store {index}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Chiudi
            </Button>
            <Button variant="primary" onClick={saveProduct}>
              Salva Prodotto
            </Button>
          </Modal.Footer>
        </Modal>
        <div>
          {showDeleteAllButton && isAdmin && (
            <Button variant="danger" onClick={deleteAllProducts}>
              Elimina Tutti i Prodotti
            </Button>
          )}

          {loading ? (
            <div>Caricamento in corso...</div>
          ) : (
            <div className="product-list">
              {products.map((product, index) => (
                <Card key={index}>
                  <Card.Img variant="top" src={product.image} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>Prezzo: {product.price}</Card.Text>
                    {isAdmin && (
                      <Button
                        variant="warning"
                        onClick={() => handleEdit(product)}>
                        Modifica
                      </Button>
                    )}
                    {isAdmin && (
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(product)}>
                        Elimina
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StorePage;
