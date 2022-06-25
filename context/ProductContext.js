import React, { createContext, useReducer, useContext } from "react";
import ProductReducer from "./ProductReducer";
import { productData } from "../data";

const ProductContext = createContext();

const initialState = {
  products: productData,
  sales: [],
  orders: [],
  totalAmount: 0,
  totalQuantity: 0,
  popular: [],
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
