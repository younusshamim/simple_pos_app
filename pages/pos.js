/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";
import styles from "../styles/pos.module.css";
import { useProductContext } from "../context/ProductContext";

const pos = () => {
  const { products, sales, totalQuantity, dispatch } = useProductContext();

  const addToSale = (id) => {
    dispatch({ type: "ADD_TO_SALE", payload: id });
    dispatch({ type: "GET_TOTAL" });
  };

  return (
    <Container className="py-3">
      {sales.length > 0 ? (
        <Link href="/sales">
          <p>
            <button type="button" className="btn btn-secondary">
              Sales Items
              <span className={styles.customBadge}>{totalQuantity}</span>
            </button>
          </p>
        </Link>
      ) : (
        <p>
          <button type="button" className="btn btn-secondary">
            Sales Items
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
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{`${product.price}/-`}</td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => addToSale(product.id)}
                >
                  Add To Sale
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {totalQuantity > 0 && (
        <Link href="/sales">
          <p className="text-center mt-4">
            <button className="btn btn-outline-secondary">
              Process To Next
            </button>
          </p>
        </Link>
      )}
    </Container>
  );
};

export default pos;
