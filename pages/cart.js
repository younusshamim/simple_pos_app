/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import styles from "../styles/Cart.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { useProductContext } from "../context/ProductContext";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";

const cart = () => {
  const { cart, totalQuantity, totalAmount, dispatch } = useProductContext();
  const { userActive } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    !userActive && router.push("/login");
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
  }, [dispatch]);

  const removeCartItem = (id) => {
    dispatch({ type: "REMOVE_CART_ITEM", payload: id });
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

  const placeOrder = async () => {
    let orderItem = { order: cart };

    try {
      await axios.post("http://localhost:3000/api/orders", orderItem);
    } catch (error) {
      console.log(error);
    }
    await router.push("/pos");
    dispatch({ type: "PLACE_ORDER" });
  };

  return (
    <>
      {userActive && (
        <Container className="py-3">
          <p>
            <button type="button" className="btn btn-secondary">
              Cart
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

              {cart &&
                cart.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{`${product.price}/-`}</td>
                    <td>
                      <span
                        className={styles.decBtn}
                        onClick={() => toggleQuantity(product._id, "decrement")}
                      >
                        <AiOutlineMinus />
                      </span>
                      <span>{product.quantity}</span>
                      <span
                        className={styles.incBtn}
                        onClick={() => toggleQuantity(product._id, "increment")}
                      >
                        <AiOutlinePlus />
                      </span>
                    </td>
                    <td>
                      <span className={styles.removeBtn}>
                        <button
                          className="btn btn-danger"
                          onClick={() => removeCartItem(product._id)}
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
      )}
    </>
  );
};

export default cart;
