const createNav = () => {
    let nav = document.querySelector('.navbar');

    nav.innerHTML = `
    <ul class="navbar_menu">
        <li class="active"><a href="../shop.html">Shop <iconify-icon icon="ion:chevron-down"></iconify-icon></a>
            <ul class="sub_menu">
                <li><a href="../romance.html">Romance</a></li>
                <li><a href="../fantasy.html">Sci-Fi & Fantasy</a></li>
                <li><a href="../mystery.html">Mystery & Crime</a></li>
                <li><a href="../biography.html">Biography</a></li>
            </ul>
        <li><a href="../index.html">Home</a></li>
        <li><a href="../about.html">About</a></li>
        <li><a href="../contacts.html">Contacts</a></li>
    </ul>
    <ul class="navbar_user">
      
        <li><input type="text" class="search-box" placeholder="search product, author"></li><li>
            <a href="#" class="search-btn">
                <i class="fa fa-search" aria-hidden="true"></i>
            </a>
        </li>
        <li><a href="../login.html">
            <div class="user-img"><i class="fa fa-user" aria-hidden="true"></i>
            <div class="login-logout-popup">
                    <p class="account-info">Logged in as: name</p>
                    <button class="btn" id="user-btn">Log out</button>
            </div></div>	
        </a></li>
        <li class="checkout">
            <a href="#">
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                <span id="checkout_items" class="checkout_items">2</span>
            </a>
        </li>
    </ul>
    `;
}

createNav();

// nav popup

const userImageButton = document.querySelector('.user-img');
const userPopup = document.querySelector('.login-logout-popup');
const popuptext = document.querySelector('.account-info');
const actionBtn = document.querySelector('#user-btn');

window.onload = () => {
    let user = JSON.parse(sessionStorage.user || null);
    if(user != null) {
        // means user is logged in
        popuptext.innerHTML = `logged in as: ${user.name}`;
        actionBtn.innerHTML = 'log out';
        actionBtn.addEventListener('click', () => {
            sessionStorage.clear();
            location.reload();
        })
    } else {
        // user is logged out
        popuptext.innerHTML = 'log in to place order';
        actionBtn.innerHTML = 'log in';
        actionBtn.addEventListener('click', () => {
            location.href = '/login';
        })
    }
}

// search box

const searchBtn = document.querySelector('.search-btn');
const searchBox = document.querySelector('.search-box');

searchBtn.addEventListener('click', () => {
    if (searchBox.value.length) {
        location.href = `/search/${searchBox.value}`;
    }
})