import Head from "next/head";
import { Container, Table } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import AddProduct from "../components/AddProduct";
import React, { useState, useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function Home({ productsList }) {
  const { dispatch, products } = useProductContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const { userActive } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    !userActive && router.push("/login");
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_PRODUCTS", payload: productsList });
  }, [productsList, dispatch]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const deleteProduct = async (id) => {
    dispatch({ type: "DELETE_PRODUCT", payload: id });

    try {
      const res = await axios.delete(
        "http://localhost:3000/api/products/" + id
      );
    } catch (err) {
      console.log(err);
    }
  };

  const addProduct = async () => {
    if (!isEdit && name && price) {
      const quantity = 1;
      let newProduct = { name, price, quantity };
      try {
        await axios.post("http://localhost:3000/api/products", newProduct);
      } catch (error) {
        console.log(error);
      }

      dispatch({ type: "ADD_PRODUCT", payload: newProduct });
      toggleModal();
      setName("");
      setPrice("");
    }

    if (isEdit && name && price) {
      try {
        const res = await axios.put(
          "http://localhost:3000/api/products/" + editId,
          {
            name: name,
            price: price,
          }
        );
      } catch (error) {
        console.log(error);
      }

      dispatch({ type: "EDIT_PRODUCT", payload: { editId, name, price } });
      toggleModal();
      setName("");
      setPrice("");
      setIsEdit(false);
    }
  };

  const editProduct = (id) => {
    toggleModal();
    setIsEdit(true);
    setEditId(id);

    const specificItem = products.find((product) => product._id === id);
    setName(specificItem.name);
    setPrice(specificItem.price);
  };

  return (
    <>
      {userActive && (
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

              {products &&
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{`${product.price}/-`}</td>
                    <td>
                      <button
                        className="btn btn-info"
                        style={{ marginRight: "5px" }}
                        onClick={() => editProduct(product._id)}
                      >
                        <BiEdit />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteProduct(product._id)}
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
      )}
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const response = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      productsList: response.data,
    },
  };
};
