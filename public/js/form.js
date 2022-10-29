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

// send data function
const sendData = (path, data) => {
    fetch(path, {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(data)
    }).then((res) => res.json())
    .then(response => {
        processData(response);
    })
}

const processData = (data) => {
    loader.style.display = null;
    if (data.alert) {
        showAlert(data.alert);
    } else if (data.name) {
        // create authToken
        data.authToken = generateToken(data.email);
        sessionStorage.user = JSON.stringify(data);
        location.replace('/');
    }
}

// alert function
const showAlert = (msg) => {
    let alertBox = document.querySelector('.alert-box');
    let alertMsg = document.querySelector('.alert-msg');
    alertMsg.innerHTML = msg;
    alertBox.classList.add('show');
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 3000);
}

