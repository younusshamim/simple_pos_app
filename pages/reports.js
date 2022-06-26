/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useProductContext } from "../context/ProductContext";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";

const reports = ({ ordersList }) => {
  const { dispatch, orders } = useProductContext();
  const { userActive } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    !userActive && router.push("/login");
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_ORDERS", payload: ordersList });
  }, [dispatch, ordersList]);

  console.log(orders);

  return (
    <>
      {userActive && (
        <Container className="py-3">
          <h2 className="text-bold">Popular Items</h2>

          <Table striped className="text-center">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </tbody>
          </Table>
        </Container>
      )}
    </>
  );
};

export default reports;

export const getServerSideProps = async (ctx) => {
  const response = await axios.get("http://localhost:3000/api/orders");
  return {
    props: {
      ordersList: response.data,
    },
  };
};
