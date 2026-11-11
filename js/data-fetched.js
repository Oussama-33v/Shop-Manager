fetch('http://localhost:3000/api/products')
  .then(response => response.json()) // Parse JSON automatically
  .then(data => {
    displayProductes(data);
  });