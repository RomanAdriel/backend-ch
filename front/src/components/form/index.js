import { useState, useContext } from "react";
import { createProduct } from "../../services/products";
import { productContext } from "../../context/productContext";

export default function Form() {
  const initialValues = {
    title: "",
    description: "",
    price: "",
    stock: "",
    code: "",
    pictureUrl: "",
  };
  const [newProduct, setNewProduct] = useState(initialValues);
  const [message, setMessage] = useState({ show: false, status: "" });
  const { products, setProducts } = useContext(productContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNewProduct(initialValues);

    await createProduct(newProduct).then((res) => {
      setMessage({ show: true, status: res.status });
      setTimeout(() => {
        setMessage({ show: false, status: "" });
      }, 5000);

      setProducts((prev) => [...prev, res.newProduct]);
    });
  };

  return (
    <section className="w-11/12 max-w-lg mx-auto shadow-lg shadow-pink-300/50 px-12 py-10 mt-10 mb-12 bg-white rounded-lg">
      <h4 className="font-bold text-2xl my-5s uppercase">Form</h4>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 py-5 relative"
      >
        {message.show && (
          <p className="text-lime-600 font-normal  border-lime-500 text-md fixed top-16 right-16 bg-lime-100 rounded-xl px-4 py-3 shadow-xl animate-toastyAnim">
            {message.status}
          </p>
        )}
        <div className="flex flex-col">
          <label htmlFor="title" className="text-gray-600">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            value={newProduct.title}
            className="p-2 rounded-sm bg-slate-100 focus:outline-1 focus:outline-pink-400/40"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-gray-600">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            onChange={handleChange}
            value={newProduct.description}
            className="p-2 rounded-sm bg-slate-100 focus:outline-1 focus:outline-pink-400/40"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="text-gray-600">
            Price
          </label>
          <input
            type="text"
            name="price"
            id="price"
            onChange={handleChange}
            value={newProduct.price}
            className="p-2 rounded-sm bg-slate-100 focus:outline-1 focus:outline-pink-400/40"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="stock" className="text-gray-600">
            Stock
          </label>
          <input
            type="text"
            name="stock"
            id="stock"
            onChange={handleChange}
            value={newProduct.stock}
            className="p-2 rounded-sm bg-slate-100 focus:outline-1 focus:outline-pink-400/40"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="code" className="text-gray-600">
            Código
          </label>
          <input
            type="text"
            name="code"
            id="code"
            onChange={handleChange}
            value={newProduct.codigo}
            className="p-2 rounded-sm bg-slate-100 focus:outline-1 focus:outline-pink-400/40"
          />
        </div>
        <div className="flex flex-col mb-10">
          <label htmlFor="pictureUrl" className="text-gray-600">
            Thumbnail
          </label>
          <input
            type="text"
            name="pictureUrl"
            id="pictureUrl"
            onChange={handleChange}
            value={newProduct.pictureUrl}
            className="p-2 rounded-sm bg-slate-100 focus:outline-1 focus:outline-pink-400/40"
          />
        </div>
        <button className="bg-pink-600 text-white font-semibold text-base py-3 rounded-md hover:bg-pink-500">
          Create Product
        </button>
      </form>
    </section>
  );
}
