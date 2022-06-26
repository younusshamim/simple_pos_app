/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import styles from "../styles/pos.module.css";
import { useProductContext } from "../context/ProductContext";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";

const pos = ({ productsList }) => {
  const { products, cart, totalQuantity, dispatch } = useProductContext();
  const { userActive } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    !userActive && router.push("/login");
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_PRODUCTS", payload: productsList });
  }, [productsList, dispatch]);

  const addToCart = (id) => {
    dispatch({ type: "ADD_TO_CART", payload: id });
    dispatch({ type: "GET_TOTAL" });
  };

  return (
    <>
      {userActive && (
        <Container className="py-3">
          {cart.length > 0 ? (
            <Link href="/cart">
              <p>
                <button type="button" className="btn btn-secondary">
                  Cart
                  <span className={styles.customBadge}>{totalQuantity}</span>
                </button>
              </p>
            </Link>
          ) : (
            <p>
              <button type="button" className="btn btn-secondary">
                Cart
                <span className={styles.customBadge}>{totalQuantity}</span>
              </button>
            </p>
          )}

          <Table striped className="text-center">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>

              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{`${product.price}/-`}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => addToCart(product._id)}
                    >
                      Add To Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {totalQuantity > 0 && (
            <Link href="/cart">
              <p className="text-center mt-4">
                <button className="btn btn-outline-secondary">
                  Process To Next
                </button>
              </p>
            </Link>
          )}
        </Container>
      )}
    </>
  );
};

export default pos;

export const getServerSideProps = async (ctx) => {
  const response = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      productsList: response.data,
    },
  };
};
