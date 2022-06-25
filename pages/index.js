import Head from "next/head";
import { Container, Table } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import AddProduct from "../components/AddProduct";
import React, { useState } from "react";
import { Link } from "next/link";
import { useProductContext } from "../context/ProductContext";

export default function Home() {
  const { products, dispatch } = useProductContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const deleteProduct = (id) => {
    dispatch({ type: "DELETE_PRODUCT", payload: id });
  };

  const addProduct = () => {
    if (!isEdit && name && price) {
      dispatch({
        type: "ADD_PRODUCT",
        payload: { name, price },
      });
      toggleModal();
      setName("");
      setPrice("");
    }

    if (isEdit && name && price) {
      dispatch({ type: "EDIT_PRODUCT", payload: { name, price, editId } });
      toggleModal();
      setName("");
      setPrice("");
    }
  };

  const editProduct = (id) => {
    toggleModal();
    setIsEdit(true);
    setEditId(id);

    const specificItem = products.find((item) => item.id === id);
    setName(specificItem.name);
    setPrice(specificItem.price);
  };

  return (
    <Container className="py-3">
      <p>
        <button className="btn btn-secondary" onClick={toggleModal}>
          Add Product
        </button>
      </p>

      <Table striped className="text-center">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>

          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{`${product.price}/-`}</td>
              <td>
                <button
                  className="btn btn-info"
                  style={{ marginRight: "5px" }}
                  onClick={() => editProduct(product.id)}
                >
                  <BiEdit />
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteProduct(product.id)}
                >
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddProduct
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        name={name}
        price={price}
        setName={setName}
        setPrice={setPrice}
        addProduct={addProduct}
        isEdit={isEdit}
      />
    </Container>
  );
}
