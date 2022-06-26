/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, userActive } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    userActive && router.push("/");
    console.log(userActive);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      <Container className="py-3">
        <Form
          className="m-auto p-5 bg-light bordered"
          style={{ width: "400px", borderRadius: "10px" }}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>

          <Button variant="secondary" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default login;
