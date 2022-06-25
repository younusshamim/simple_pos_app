/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import styles from "../styles/Sales.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { useProductContext } from "../context/ProductContext";
import { AiFillDelete } from "react-icons/ai";
import { useRouter } from "next/router";

const sales = () => {
  const { sales, totalQuantity, totalAmount, dispatch } = useProductContext();
  const router = useRouter();

  const removeSaleItem = (id) => {
    dispatch({ type: "REMOVE_SALE_ITEM", payload: id });
    dispatch({ type: "GET_TOTAL" });
  };

  const toggleQuantity = (id, toggleType) => {
    if (toggleType === "increment") {
      dispatch({ type: "INCREMENT_QUANTITY", payload: id });
      dispatch({ type: "GET_TOTAL" });
    }
    if (toggleType === "decrement") {
      dispatch({ type: "DECREMENT_QUANTITY", payload: id });
      dispatch({ type: "GET_TOTAL" });
    }
  };

  const placeOrder = () => {
    dispatch({ type: "PLACE_ORDER" });
    router.push("/pos");
  };

  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
  }, [dispatch]);

  return (
    <Container className="py-3">
      <p>
        <button type="button" className="btn btn-secondary">
          Sales Items
          <span className={styles.customBadge}>{totalQuantity}</span>
        </button>
      </p>

      <Table className="text-center">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>

          {sales &&
            sales.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{`${product.price}/-`}</td>
                <td>
                  <span
                    className={styles.decBtn}
                    onClick={() => toggleQuantity(product.id, "decrement")}
                  >
                    <AiOutlineMinus />
                  </span>
                  <span>{product.quantity}</span>
                  <span
                    className={styles.incBtn}
                    onClick={() => toggleQuantity(product.id, "increment")}
                  >
                    <AiOutlinePlus />
                  </span>
                </td>
                <td>
                  <span className={styles.removeBtn}>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeSaleItem(product.id)}
                    >
                      <AiFillDelete />
                    </button>
                  </span>
                </td>
              </tr>
            ))}

          <tr className="bg-light text-dark">
            <th>Total</th>
            <th></th>
            <th>{totalAmount}/-</th>
            <th></th>
          </tr>
        </tbody>
      </Table>

      <p className="text-center mt-4">
        <button className="btn btn-outline-secondary" onClick={placeOrder}>
          Place Order
        </button>
      </p>
    </Container>
  );
};

export default sales;
