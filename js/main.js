const productsSection = document.querySelector('#products');
const searchBlock = document.getElementById('search-for-product');
const categoryInput = document.getElementById('category');
const priceInput = document.getElementById('maxPrice');
const cartProducts = document.querySelector('#product-card');

const myCart = [];

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
            <li id="card"
                class="w-full flex flex-col bg-gradient-to-r from-[#EAE7DF] to-[#C6DCF2 ] gap-4 rounded-xl p-1 outline-none ring-2 ring-blue-300 hover:drop-shadow-xl transition">
                <img id="product-image" src="http://localhost:3000${product.image}" alt="${product.name}" class="rounded-xl">
                <hr class="color-[#2475AF]-700">
                <article style="height: 50%; width: 100%;" class="flex flex-col gap-4 overflow-hidden">
                    <div class="flex justify-between items-center">
                        <div class = "grid">
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
                        <button class="add-to-cart-btn w-full flex gap-3 p-3 bg-[#2475AF] hover:bg-cyan-500 rounded-3xl text-[#EAE7DF] items-center"  data-id = "${product.id}"><ion-icon name="card-outline"  style="height: 30px; width: 30px;"></ion-icon> Add to cart</button>
                    </div>
                </article>
            </li>
        `
        });
    };
    // AELtoReservBtns(reservProductBtn);
}


productsSection.addEventListener('click', (e) => {
    if (e.target.classList.contains("add-to-cart-btn")) {
        const productId = e.target.dataset.id;
        addProductToCart(productId);
        displayMyCart(myCart);

    }
});

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



async function addProductToCart(productId) {
    const products = await fetchApi(baseUrl + 'api/products');
    let product = products.find(product => { return product.id == productId });
    let existenProducts = myCart.find(order => order.id == productId)
    if (existenProducts) {
        existenProducts.quantity++;
    }
    else {
        product.quantity = 1;
        myCart.push(product)
    }
    console.log(myCart);

}

function displayMyCart(data) {

    cartProducts.innerHTML = ''
    data.forEach(product => {
        cartProducts.innerHTML += `
                <li
                            class="flex h-80 gap-12 text-[#2475AF] bg-gradient-to-r from-[#EAE7DF] to-[#C6DCF2] rounded-2xl">
                            <img src="http://localhost:3000${product.image}" alt="${product.name}" style="width: 50%;" class="rounded-2xl" />
                            <article style="width: 50%; height: auto" class="flex flex-col justify-between w-full p-5">
                                <div class="w-full flex justify-between items-center">
                                    <h2 id="product-title" class="text-4xl font-bold">${product.name}</h2>
                                    <span class="font-bold text-3xl text-[#FED109]">${product.price}</span>
                                </div>
                                <div>
                                    <p>•${product.description}
                                    </p>
                                </div>
                                <div class="flex flex-col gap-3">
                                    <label for="quantity" class="font-bold ">Quantity</label>
                                    <div class="flex items-center gap-4">
                                        <button class="p-3 bg-white rounded-full"><ion-icon name="remove-outline"
                                                style="width: 15px; height: 15px"></ion-icon></button>
                                        <span class="text-2xl font-bold">${product.quantity}</span>
                                        <button class="p-3 bg-white rounded-full"><ion-icon name="add-outline"
                                                style="width: px; height: 15px"></ion-icon></button>
                                    </div>
                                </div>
                            </article>
                </li>
            `
    })
}