const fetchData = async () => {
  const response = await fetch('http://localhost:3030/');

  const data = await response.json();

  return data;
};

(async () => {
  const fetchProducts = await fetchData();
  console.log(fetchProducts.Products);
})();
