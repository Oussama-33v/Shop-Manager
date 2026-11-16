const productsSection = document.getElementById('products');
const searchBlock = document.getElementById('search-for-product');
const categoryInput = document.getElementById('category');
const priceInput = document.getElementById('maxPrice');


functionsManager()

function displayProductes(data) {
    if (data.length === 0) {
        productsSection.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify-center min-h-[60vh] text-center">
                <p class="text-xl font-semibold text-slate-800">Product not found</p>
                <p class="mt-1 text-sm text-slate-500">Try adjusting your search or category filter.</p>
            </div>        
        `
        return;
    }
    else {
        productsSection.innerHTML = '';

        data.forEach(product => {
            productsSection.innerHTML += `
            <div id="product-card"
                class="w-full flex flex-col bg-gradient-to-r from-[#EAE7DF] to-[#C6DCF2 ] gap-4 rounded-xl p-1 outline-none ring-2 ring-blue-300 hover:drop-shadow-xl transition" data-id = ${product.id}>
                <img id="product-image" src="http://localhost:3000${product.image}" alt="${product.name}" class="rounded-xl">
                <hr class="color-[#2475AF]-700">
                <article style="height: 50%; width: 100%;" class="flex flex-col gap-4 overflow-hidden">
                    <div class="flex justify-between items-center">
                        <div>
                            <h2 id="product-name" class="font-bold text-3xl text-[#2475AF] ">${product.name}</h2>
                            <span id="category" class="mt-2 font-bold p-2 bg-white rounded-2xl text-[#2475AF]">${product.categoryName}</span>
                        </div>
                        <span id="price" class="font-bold text-3xl text-[#FED109] ">${product.price}$</span>
                    </div>
                    <div>
                        <p class="p-2 bg-blue-50 rounded-2xl ">${product.description}</p>
                    </div>
                    <div class="flex flex-col gap-3">
                        <span id="stock-Statu" class="flex text-green-400 rounded-2xl font-bold pl-10">${getStockStatus(product.stock)}</span>
                        <button class="w-full flex gap-3 p-3 bg-[#2475AF] hover:bg-cyan-500 rounded-3xl text-[#EAE7DF] items-center"><ion-icon name="card-outline"  style="height: 30px; width: 30px;"></ion-icon> Add to cart</button>
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

function getCategreisByName(data) {
    data.forEach(categ => {
        categoryInput.innerHTML += `
            <option value="${categ.id}">${categ.name}</option>
        `
    })
}

function searchForProductsByName() {
    searchBlock.addEventListener('input', async e => {
        let searchedValue = searchBlock.value.trim()
        const searchedProducts = await fetchApi(`${baseUrl}api/products?search=${searchedValue}`);
        console.log(searchedProducts);
        displayProductes(searchedProducts)
    })

}

function filterByCategorye() {
    categoryInput.addEventListener('change', async (event) => {
        let selectedCategory = categoryInput.value
        let products = await fetchApi(`${baseUrl}api/products?categoryId=${selectedCategory}`)
        displayProductes(products)
    })
}

function filterByMaxPrice() {
    priceInput.addEventListener('input', async (e) => {
        let maxPrice = priceInput.value.trim()
        if (maxPrice === "") {
            priceInput.value = '';
            return;
        }
        let products = await fetchApi(`${baseUrl}api/products?maxPrice=${maxPrice}`);
        displayProductes(products)
    })
}