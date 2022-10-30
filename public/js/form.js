// redirect to home page if user logged in
window.onload = () => {
    if (sessionStorage.user) {
        user = JSON.parse(sessionStorage.user);
        if (compareToken(user.authToken, user.email)) {
            location.replace('/');
        }
    }
}

const loader = document.querySelector('.loaderr');

// select inputs
const submitBtn = document.querySelector('.submit-btn');
const Name = document.querySelector('#namee') || null;
const email = document.querySelector('#email');
const password = document.querySelector('#psw');

submitBtn.addEventListener('click', () => {
        if (Name != null) { // sign up page
            // if (Name.value.length < 3){
            //     showAlert('Name must be at least 3 letters long');
            // } else if (!email.value.length) {
            //     showAlert('enter your email');
            // } else if (password.value.length < 5) {
            //     showAlert('password should be at least 5 letters long');
            // } else {
            //submit form
            loader.style.display = 'block';
            sendData('/signup', {
                name: Name.value,
                email: email.value,
                password: password.value,
                seller: false
            })
            // }
        } else {
            // login page
            if (!email.value.length || !password.value.length) {
                showAlert('fill all the inputs');
            } else {
                loader.style.display = 'block';
                sendData('/login', {
                    email: email.value,
                    password: password.value
                })
            }
        }
})
