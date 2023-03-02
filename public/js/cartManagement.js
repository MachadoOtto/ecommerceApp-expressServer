const toastAddToCart = document.getElementById('toastAddToCart');
const toastAddToCartFail = document.getElementById('toastAddToCartFail');

document.getElementById('btn-addToCart').addEventListener('click', (event) => {
    event.preventDefault();
    let cartId = document.getElementById('mdl-addCart-cartId').value;
    let productId = document.getElementById('mdl-addCart-productId').value;
    console.log(cartId, productId);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                toastAddToCart.classList.add('show');
                setTimeout(() => {
                    toastAddToCart.classList.remove('show');
                }, 10000);
            } else {
                toastAddToCartFail.classList.add('show');
                setTimeout(() => {
                    toastAddToCartFail.classList.remove('show');
                }, 10000);
            }
        }
    }
    xhr.open('POST', `../api/carts/${cartId}/product/${productId}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    document.getElementById('mdl-addCart-cartId').value = '';
    document.getElementById('mdl-addCart-productId').value = 'undefined';
});