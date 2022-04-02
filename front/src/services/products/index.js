const baseUrl = "/api/productos";

export function getProducts() {
  return fetch(baseUrl).then((res) => res.json());
}

export async function createProduct(product) {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then((res) => res.json());
}
