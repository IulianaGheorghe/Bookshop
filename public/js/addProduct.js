let user = JSON.parse(sessionStorage.user || null);
let loader = document.querySelector('.loaderr');

// checking if user is logged in or not
window.onload = () => {
    if (user) {
        if (!compareToken(user.authToken, user.email)) {
            location.replace('/login');
        }
    } else {
        location.replace('/login');
    }
}

// price inputs

const actualPrice = document.querySelector('#actual-price');
const discountPercentage = document.querySelector('#discount');
const sellingPrice = document.querySelector('#sell-price');

discountPercentage.addEventListener('input', () => {
    if(discountPercentage.value > 100) {
        discountPercentage.value = 90;
    } else {
        let discount = discountPercentage.value * actualPrice.value / 100;
        sellingPrice.value = actualPrice.value - discount;
    }
})

sellingPrice.addEventListener('input', () => {
    let discount = (1 - sellingPrice.value / actualPrice.value) * 100;
    discountPercentage.value = discount;
})

// upload image handle
const image_input = document.querySelector('.fileupload');
var uploaded_image = "";

image_input.addEventListener('change', function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploaded_image = reader.result;
        document.querySelector(".product-image").style.backgroundImage = `url(${uploaded_image})`;
    })
    reader.readAsDataURL(this.files[0]);
})

// form submission

const productName = document.querySelector('#product-name');
const shortLine = document.querySelector('#short-des');
const des = document.querySelector('#des');

const stock = document.querySelector('#stock');
const tags = document.querySelector('#tags');

const addProductBtn = document.querySelector('#add-btn');

const validateForm = () => {
    if (!productName.value.length) {
        return showAlert('Enter book title');
    } else if (!shortLine.value.length) {
        return showAlert('Enter book author');
    }else if (!des.value.length) {
        return showAlert('Enter book description');
    }else if (!uploaded_image.length) {
        return showAlert('Upload an image');
    }else if (!actualPrice.value.length || !discount.value.length || !sellingPrice.value.length) {
        return showAlert('You must add pricings');
    }else if (stock.value < 20) {
        return showAlert('You should have at least 20 items in stock');
    } else if (!tags.value.length) {
        return showAlert('Enter tag(s)');
    }
    return true;
}

const productData = () => {
    return data = {
        title: productName.value,
        author: shortLine.value,
        des: des.value,
        image: uploaded_image,
        actualPrice: actualPrice.value,
        discount: discountPercentage.value,
        sellPrice: sellingPrice.value,
        stock: stock.value,
        tags: tags.value,
        email: user.email
    }
}

addProductBtn.addEventListener('click', () => {
    //validate form
    if (validateForm()) {//validateForm return true or false while doing validation
        loader.style.display = 'block';
        let data = productData();
        sendData('/add-product', data);
    }
})