/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useProductContext } from "../context/ProductContext";

const reports = () => {
  const { dispatch, popular } = useProductContext();

  useEffect(() => {
    dispatch({ type: "GET_POPULAR" });
  }, [dispatch]);

  if (popular.length === 0) {
    return (
      <Container className="py-3">
        <h4 className="text-center text-secondary mt-5">Not found</h4>
      </Container>
    );
  }

  return (
    <Container className="py-3">
      <h2 className="text-bold">Popular Items</h2>

      <Table striped className="text-center">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>

          {popular.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{`${product.price}/-`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default reports;
