import React from "react";
import { Container, Form, Button } from "react-bootstrap";

const login = () => {
  return (
    <Container className="py-3">
      <Form
        className="m-auto p-5 bg-light bordered"
        style={{ width: "400px", borderRadius: "10px" }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="secondary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default login;
