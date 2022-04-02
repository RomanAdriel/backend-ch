import { useState, useEffect, useContext } from "react";
import { productContext } from "../../context/productContext";
import { getCartById } from "../../services/cart";

export default function Cart() {
  const { cart, setCart } = useContext(productContext);
  const [message, setMessage] = useState({ show: false, status: "" });

  console.log("CART", cart);

  useEffect(() => {
    console.log("cartEffect");
    getCartById().then((res) => {
      setCart(res.products.length);
      console.log("CART", res.products.length);

      setMessage({ show: true, status: "in the status" });
      setTimeout(() => {
        setMessage({ show: false, status: "" });
      }, 5000);
    });
  }, []);

  return (
    <div className="pt-8 relative ">
      <div className="w-48 h-4 ml-auto mr-5 relative scale-75">
        {cart >= 1 ? (
          <p className="absolute scale-50 -top-4 -right-5 bg-rose-400 w-12 h-12 grid place-content-center text-white font-bold rounded-full text-3xl">
            {cart}
          </p>
        ) : null}

        <img src="/cart.svg" alt="cart" className="w-12 m-0 ml-auto" />
      </div>
    </div>
  );
}
