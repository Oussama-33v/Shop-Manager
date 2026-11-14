const productsSection = document.getElementById('products');
const searchBlock = document.getElementById('search-for-product')


functionsManager()




function displayProductes(data) {
    if (data.lenght === 0) {
        productsSection.innerHTML = `<p>Product not found !!</p>`
        return;
    }
    else {
        productsSection.innerHTML = '';

        data.forEach(product => {
            productsSection.innerHTML += `
            <div id="product-card"
                class="w-full flex flex-col bg-indigo-100 gap-4 rounded-xl px-3 py-2.5 text-black outline-none ring-2 ring-black-500 hover:ring-black transition" data-id = ${product.id}>
                <img id="product-image" src="http://localhost:3000${product.image}" alt="${product.name}" class="rounded-xl">
                <hr class="color-[#000000]-300">
                <article style="height: 50%; width: 100%;" class="flex flex-col gap-4 overflow-hidden">
                    <div class="flex justify-between items-center">
                        <div>
                            <h2 id="product-name" class="font-bold text-2xl ">${product.name}</h2>
                            <span id="category" class="font-bold">${product.categoryName}</span>
                        </div>
                        <span id="price" class="font-bold text-3xl text-amber-400 ">${product.price}$</span>
                    </div>
                    <div>
                        <p class="p-2 bg-blue-50 rounded-2xl ">${product.description}</p>
                    </div>
                    <div class="flex gap-10 items-center">
                        <span id="stock-Statu" class="flex p-4 bg-green-400 rounded-2xl font-bold ">${getStockStatus(product.stock)}</span>
                        <button class="flex gap-3 p-4  bg-[#FFD51E] rounded-2xl items-center"><ion-icon name="card-outline"  style="height: 30px; width: 30px;"></ion-icon> Add to cart</button>
                    </div>
                </article>
            </div>
        `
        });
    }

}

function getStockStatus(stock) {
    if (stock > 0) {
        return 'Available'
    }
    else {
        return 'Sold out'
    }
}

function getCategrysByName(data) {
    const CategoryBlock = document.getElementById('category');
    data.forEach(categ => {
        CategoryBlock.innerHTML += `
            <option value="${categ.id}">${categ.name}</option>
        `
    })
}

searchBlock.addEventListener('input', async e => {
    let searchedValue = searchBlock.value.trim()
    const searchedProducts = await fetchApi(`${baseUrl}api/products?search=${searchedValue}`);
    console.log(searchedProducts);
    displayProductes(searchedProducts)
})

// displayProductes(data)
