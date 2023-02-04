let thumbnailCounter = 1;
let thumbnailCounterUpdate = 1;

const toastAddProduct = document.getElementById('toastAddProduct');
const toastAddProductFail = document.getElementById('toastAddProductFail');
const toastUpdateProduct = document.getElementById('toastUpdateProduct');
const toastUpdateProductFail = document.getElementById('toastUpdateProductFail');
const toastDeleteProduct = document.getElementById('toastDeleteProduct');
const toastDeleteProductFail = document.getElementById('toastDeleteProductFail');

document.getElementById('addThumbnail').addEventListener('click', () => {
    let thumbnail = document.getElementById('thumbnailsDiv');
    let newThumbnail = document.createElement('div');
    newThumbnail.innerHTML =`<div class="col form-floating mb-2">
        <input type="text" class="form-control" id="thumbnail-${thumbnailCounter++}" placeholder="Thumbnails">
        <label for="floatingInput">Thumbnails</label>
    </div>`
    thumbnail.appendChild(newThumbnail);
});

document.getElementById('closeAdd').addEventListener('click', () => {
    for (let i = 1; i < thumbnailCounter; i++) {
        document.getElementById('thumbnailsDiv').removeChild(document.getElementById('thumbnailsDiv').lastChild);
    }
    thumbnailCounter = 1;
});

document.getElementById('addThumbnailUpdate').addEventListener('click', (event) => {
    event.preventDefault();
    let thumbnail = document.getElementById('thumbnailsDivUpdate');
    let newThumbnail = document.createElement('div');
    newThumbnail.innerHTML =`<div class="col form-floating mb-2">
        <input type="text" class="form-control" id="updateThumbnail-${thumbnailCounterUpdate++}" placeholder="Thumbnails">
        <label for="floatingInput">Thumbnails</label>
    </div>`
    thumbnail.appendChild(newThumbnail);
});

document.getElementById('closeUpdate').addEventListener('click', () => {
    for (let i = 1; i < thumbnailCounterUpdate; i++) {
        document.getElementById('thumbnailsDivUpdate').removeChild(document.getElementById('thumbnailsDivUpdate').lastChild);
    }
    thumbnailCounterUpdate = 1;
});

document.getElementById('addProduct').addEventListener('click', (event) => {
    event.preventDefault();
    let thumbnails = [];
    for (let i = 0; i < thumbnailCounter; i++) {
        thumbnails.push(document.getElementById(`thumbnail-${i}`).value);
    }
    let status = document.getElementById('status').checked;
    let product = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        code: document.getElementById('code').value,
        status,
        stock: document.getElementById('stock').value,
        category: document.getElementById('category').value,
        thumbnails
    };
    for (let i = 1; i < thumbnailCounter; i++) {
        document.getElementById('thumbnailsDiv').removeChild(document.getElementById('thumbnailsDiv').lastChild);
    }
    thumbnailCounter = 1;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                toastAddProduct.classList.add('show');
                setTimeout(() => {
                    toastAddProduct.classList.remove('show');
                }, 10000);
            } else {
                toastAddProductFail.classList.add('show');
                setTimeout(() => {
                    toastAddProductFail.classList.remove('show');
                }, 10000);
            }
        }
    }
    xhr.open('POST', '/api/products', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(product));
});

document.getElementById('updateProduct').addEventListener('click', (event) => {
    event.preventDefault();
    let thumbnails = [];
    for (let i = 0; i < thumbnailCounterUpdate; i++) {
        thumbnails.push(document.getElementById(`updateThumbnail-${i}`).value);
    }
    let status = document.getElementById('updateStatus').checked;
    let product = {
        title: document.getElementById('updateTitle').value,
        description: document.getElementById('updateDescription').value,
        price: document.getElementById('updatePrice').value,
        code: document.getElementById('updateCode').value,
        status,
        stock: document.getElementById('updateStock').value,
        category: document.getElementById('updateCategory').value,
        thumbnails
    };
    for (let i = 1; i < thumbnailCounterUpdate; i++) {
        document.getElementById('thumbnailsDivUpdate').removeChild(document.getElementById('thumbnailsDivUpdate').lastChild);
    }
    thumbnailCounterUpdate = 1;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                toastUpdateProduct.classList.add('show');
                setTimeout(() => {
                    toastUpdateProduct.classList.remove('show');
                }, 10000);
            } else {
                toastUpdateProductFail.classList.add('show');
                setTimeout(() => {
                    toastUpdateProductFail.classList.remove('show');
                }, 10000);
            }
        }
    }
    xhr.open('PUT', `/api/products/${document.getElementById('updateID').value}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(product));
});

document.getElementById('deleteProduct').addEventListener('click', (event) => {
    event.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                toastDeleteProduct.classList.add('show');
                setTimeout(() => {
                    toastDeleteProduct.classList.remove('show');
                }, 10000);
            } else {
                toastDeleteProductFail.classList.add('show');
                setTimeout(() => {
                    toastDeleteProductFail.classList.remove('show');
                }, 10000);
            }
        }
    }
    xhr.open('DELETE', `/api/products/${document.getElementById('productDeleteId').value}`, true);
    xhr.send();
});