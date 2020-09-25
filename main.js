const fetchData = async () => {
  const response = await fetch('http://localhost:3030/');

  const data = await response.json();

  console.log(data);
};

fetchData();
