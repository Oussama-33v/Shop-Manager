const baseUrl = "http://localhost:3000/"

// const productsUrl = 'http://localhost:3000/api/products';
// const categoryesUrl = 'http://localhost:3000/api/categories'

// fetch(productsUrl)
//   .then(response => response.json()) // Parse JSON automatically
//   .then(data => {
//     displayProductes(data);
//   });


// fetch(categoryesUrl)
//   .then(response => response.json()) // Parse JSON automatically
//   .then(data => {
//     console.log(data);

//     
//   });


async function fetchApi(url) {
  const respons = await fetch(url);
  console.log(respons.status);
  if (!respons.ok) {
    const problem = await respons.json();
    return problem.message;
  }
  const data = await respons.json();
  return data
}


async function functionsManager() {
  const products = await fetchApi(baseUrl+'api/products');
  displayProductes(products);
  const categories = await fetchApi(baseUrl+'api/categories');
  getCategrysByName(categories)
}

functionsManager()