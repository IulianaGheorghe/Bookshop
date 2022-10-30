let loader = document.querySelector('.loaderr');

const becomeSellerElement = document.querySelector('.become-seller');
const productListingElement = document.querySelector('.product-listing');
const applyForm = document.querySelector('.apply-form');
const showApplyFormBtn = document.querySelector('#apply-btn');

window.onload = () => {
    if(sessionStorage.user) {
        let user = JSON.parse(sessionStorage.user);
        if (compareToken(user.authToken, user.email)) {
            if (!user.seller) {
                becomeSellerElement.classList.remove('hide');
                applyForm.classList.add('hide');
            } else {
                productListingElement.classList.remove('hide');
                applyForm.classList.add('hide');
            }
        } else {
            location.replace('/login');
        }
    } else {
        location.replace('/login');
    }
}

showApplyFormBtn.addEventListener('click', () => {
    becomeSellerElement.classList.add('hide');
    applyForm.classList.remove('hide');
})

// seller submission

const applyFormButton = document.querySelector('#apply-form-btn');
const businessName = document.querySelector('#business-name');
const address = document.querySelector('#about');
const about = document.querySelector('#about');

applyFormButton.addEventListener('click', () => {
    if (!businessName.value.length || !address.value.length || !about.value.length) {
        showAlert('fill all the inputs');
    } else {
        //making server request
        loader.style.display = 'block';
        sendData('/seller', {
            name: businessName.value,
            address: address.value,
            about: about.value,
            email: JSON.parse(sessionStorage.user).email
        })
    }
})