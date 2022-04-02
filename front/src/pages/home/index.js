import { useEffect, useContext } from "react";
import { getProducts } from "../../services/products";
import { productContext } from "../../context/productContext";
import ListOfProducts from "../../components/listOfProducts";
import Form from "../../components/form";
import Cart from "../../components/cart";

export default function Home() {
  const { products, setProducts } = useContext(productContext);

  useEffect(() => {
    console.log("render EFFECT");
    getProducts().then((products) => setProducts(products));
  }, [setProducts]);

  return (
    <>
      <Cart />
      <h1 className="text-3xl text-center font-bold w-3/4 m-auto py-24 md:w-[550px]">
        Román's e-Commerce
      </h1>
      <ListOfProducts products={products} />
      <Form />
    </>
  );
}
