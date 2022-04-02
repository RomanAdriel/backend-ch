import { useContext } from "react";
import { productContext } from "../../context/productContext";
import { addProductToCart, getCartById } from "../../services/cart";
import "./card.css";

export default function Card({ product }) {
  const { setCart } = useContext(productContext);

  const addProduct = async () => {
    console.log(product);
    await addProductToCart(product);
    const result = await getCartById();

    setCart(result.products.length);
  };

  return (
    <>
      <div className="card pb-8 rounded-xl">
        <img src={product.pictureUrl} alt="placeholder" />
        <h3 className="font-bold text-center text-lg mb-2">
          {product.title}
        </h3>
        <p className="text-center text-sm px-5 mb-7">
          {product.description} Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Ex eligendi doloribus aliquid sequi, a animi.
        </p>
        <p className="text-center font-bold text-3xl">{`$${product.price}`}</p>
        <button
          onClick={addProduct}
          className="w-1/2 bg-black text-white rounded-xl font-bold py-3 mt-10 mx-auto block scale-90 active:scale-[.87] active:transition-transform"
        >
          Add to Cart
        </button>
      </div>
    </>
  );
}
