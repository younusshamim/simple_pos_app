import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useProductContext } from "../context/ProductContext";

const AddProduct = ({
  modalOpen,
  toggleModal,
  name,
  setName,
  price,
  setPrice,
  addProduct,
  isEdit,
}) => {
  const { dispatch } = useProductContext();

  return (
    <div>
      <Modal show={modalOpen}>
        <Modal.Header>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="write name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="write price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button variant="info" onClick={() => addProduct()}>
            {isEdit ? "Edit" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddProduct;
