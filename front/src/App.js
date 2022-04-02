import React from "react";
import { ProductProvider } from "./context/productContext";
import "./App.css";

import Home from "./pages/home";

function App() {
  return (
    <div className="App">
      <ProductProvider>
        <Home />
      </ProductProvider>
    </div>
  );
}

export default App;
