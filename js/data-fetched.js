const productsUrl = 'http://localhost:3000/api/products';
const categoryesUrl = 'http://localhost:3000/api/categories'

fetch(productsUrl)
  .then(response => response.json()) // Parse JSON automatically
  .then(data => {
    displayProductes(data);
  });

  fetch(categoryesUrl)
  .then(response => response.json()) // Parse JSON automatically
  .then(data => {
    console.log(data);
    
    getCategrysByName(data);
  });
