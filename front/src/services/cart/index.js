const baseUrl = "/api/carrito";

export async function getCartById() {
  return fetch(`${baseUrl}/1/productos`).then((res) => res.json());
}

export async function addProductToCart(product) {
  return fetch(`${baseUrl}/1/productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then((res) => res.json());
}
