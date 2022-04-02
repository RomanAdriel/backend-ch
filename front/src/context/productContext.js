import { createContext, useState } from "react";

export const productContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(0);

  return (
    <productContext.Provider
      value={{ products, setProducts, cart, setCart }}
    >
      {children}
    </productContext.Provider>
  );
};
