import Card from "../card/index";
import "./listOfProducts.css";

export default function ListOfProducts({ products }) {
  console.log("PRODUCTS LIST", products);
  return (
    <section className="card-container">
      {products.map((prod) => (
        <Card key={prod.id} product={prod} />
      ))}
    </section>
  )
}
