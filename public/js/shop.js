document.addEventListener("DOMContentLoaded", function () {
  fetchProducts();
});

async function fetchProducts() {
  const container = document.querySelector(".products-list");

  try {
    const response = await fetch("YOUR_API_ENDPOINT_HERE");
    if (!response.ok) container.innerHtml = `<P>Failed to load products</P>`;

    const res = await response.json();

    container.innerHTML = res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    container.innerHTML =
      '<div class="no-products">Failed to load products. Please try again later.</div>';
  }
}
