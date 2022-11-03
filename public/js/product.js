const productImage = document.querySelector(".image");

const setData = (data) => {
    let htitle = document.querySelector('title');

    // image
    if (data.image) {
        productImage.style.backgroundImage = `url(${data.image})`;
    } else {
        productImage.style.display = 'none';
    }

    // texts
    const title = document.querySelector('.product-title');
    const author = document.querySelector('.product-author');
    const des = document.querySelector('.des');

    htitle.innerHTML += title.innerHTML = data.title;
    author.innerHTML = "by " + data.author;
    des.innerHTML = data.des;

    // pricing
    const sellPrice = document.querySelector('.product-price');
    const actualPrice = document.querySelector('.product-actual-price');
    const discount = document.querySelector('.product-discount');

    sellPrice.innerHTML = `$${data.sellPrice}`;
    actualPrice.innerHTML = `$${data.actualPrice}`;
    discount.innerHTML = `( ${data.discount}% off )`;

}

// fetch data
const fetchProductData = () => {
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({id: productId})
    })
    .then(res => res.json())
    .then(data => {
        setData(data);
    })
}

let productId = null;
if (location.pathname != '/products') {
    productId = decodeURI(location.pathname.split('/').pop());
    fetchProductData();
}