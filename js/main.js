

function displayProductes(data) {
    const productsSection = document.getElementById('products');
    console.log(productsSection);
    productsSection.innerHTML = '';

    data.forEach(product => {
        productsSection.innerHTML += `
            <div id="product-card"
                class="w-full flex flex-col bg-indigo-100 gap-4 rounded-xl px-3 py-2.5 text-black outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors">
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
                        <span id="product-Statu" class="flex p-4 bg-green-400 rounded-2xl font-bold ">Available</span>
                        <button class="flex gap-3 p-4  bg-[#FFD51E] rounded-2xl items-center"><ion-icon name="card-outline"  style="height: 30px; width: 30px;"></ion-icon> Add to cart</button>
                    </div>
                </article>
            </div>
        `
        console.log(product.image);
        
    });
}

function g(params) {
    
}