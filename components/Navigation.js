import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import Link from "next/link";
import styles from "../styles/Navigation.module.css";

const Navigation = () => {
  return (
    <Navbar bg="secondary" variant="dark" expand="lg" className="py-3">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Link href="/">
              <a className={styles.navLink}>DASHBOARD</a>
            </Link>
            <Link href="/pos">
              <a className={styles.navLink}>POS</a>
            </Link>
            <Link href="/reports">
              <a className={styles.navLink}>REPORTS</a>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
