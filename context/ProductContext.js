import React, { createContext, useReducer, useContext, useEffect } from "react";
import ProductReducer from "./ProductReducer";
// import { productData } from "../data";
import axios from "axios";

const ProductContext = createContext();

const initialState = {
  products: [],
  cart: [],
  orders: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(ProductContext);
};

export { ProductContextProvider, useProductContext };
