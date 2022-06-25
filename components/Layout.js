import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./Navigation";
import BrandName from "./BrandName";

const Layout = ({ children }) => {
  return (
    <div>
      <BrandName />
      <Navigation />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
