const productsSection = document.getElementById('products');
const searchBlock = document.getElementById('search-for-product')
const CategoryBlock = document.getElementById('category');


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

function getCategreisByName(data) {
    data.forEach(categ => {
        CategoryBlock.innerHTML += `
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
    CategoryBlock.addEventListener('change', async (event) => {
        let selectedCategory = CategoryBlock.value
        let products = await fetchApi(`${baseUrl}api/products?categoryId=${selectedCategory}`)
        displayProductes(products)  
    })
}