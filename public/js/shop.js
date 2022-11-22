const createProduct = (data) => {
    let productContainer = document.querySelector('.product-container');
    productContainer.innerHTML += `
    <div class="product-card">
        <div class="product-image">
            <span class="tag">-${data.discount}%</span>
            <img src="${data.image}" class="product-thumb" alt="">
            <button class="card-action-btn open-btn" onclick="location.href = '/products/${data.id}'"><img src="img/open.png" alt=""></button>
        </div>
        <div class="product-info">
            <h2 class="product-title">${data.title}</h2>
            <p class="product-author">${data.author}</p>
            <span class="price">$${data.sellPrice}</span> 
            <span class="actual-price">$${data.actualPrice}</span>
        </div>
    </div>
    `;
}

let loader = document.querySelector('.loaderr');
let user = JSON.parse(sessionStorage.user || null);

const productListingElement = document.querySelector('.product-listing');

window.onload = () => {
    loader.style.display = 'block';
    setupProducts();
}

const setupProducts = () => {
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({email: "iulia@mail.com"})
    })
    .then(res => res.json())
    .then(data => {
        loader.style.display = null;
        productListingElement.classList.remove('hide');
        if (data != 'no products') {
            data.forEach(product => createProduct(product));
        }
    });
}
