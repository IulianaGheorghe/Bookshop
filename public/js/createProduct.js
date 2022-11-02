const createProduct = (data) => {
    let productContainer = document.querySelector('.product-container');
    productContainer.innerHTML += `
    <div class="product-card">
        <div class="product-image">
            <span class="tag">-${data.discount}%</span>
            <img src="${data.image}" class="product-thumb" alt="">
            <button class="card-action-btn edit-btn" onclick="location.href = '/add-product/${data.id}'"><img src="img/edit.png" alt=""></button>
            <button class="card-action-btn open-btn" onclick="location.href = '/products/${data.id}'"><img src="img/open.png" alt=""></button>
            <button class="card-action-btn delete-popup-btn" onclick="openDeletePopup('${data.id}')"><img src="img/delete.png" alt=""></button>
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

const openDeletePopup = (id) => {
    let deleteAlert = document.querySelector('.delete-alert');
    deleteAlert.style.display = 'flex';

    let closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => deleteAlert.style.display = null);

    let deleteBtn = document.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteItem(id));
}

const deleteItem = (id) => {
    fetch('/delete-product', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id: id})
    }).then(res => res.json())
    .then(data => {
        if (data == 'success') {
            location.reload();
        } else {
            showAlert('Some error occured while the product. Try again');
        }
    })
}
