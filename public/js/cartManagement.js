const toastAddToCart = document.getElementById('toastAddToCart');
const toastAddToCartFail = document.getElementById('toastAddToCartFail');
const toastPurchaseCartFail = document.getElementById('toastPurchaseCartFail');

function addToCart(productId) {
    let xhr_cart = new XMLHttpRequest();
    xhr_cart.onreadystatechange = () => {
        if (xhr_cart.readyState === 4) {
            if (xhr_cart.status === 200) {
                let cartId = xhr_cart.responseText
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
            } else {
                toastAddToCartFail.classList.add('show');
                setTimeout(() => {
                    toastAddToCartFail.classList.remove('show');
                }, 10000);
            }
        }
    }
    xhr_cart.open('GET', `../api/sessions/user/cart`, true);
    xhr_cart.setRequestHeader('Content-Type', 'application/json');
    xhr_cart.send();
}

function purchaseCart() {
    let xhr_cart = new XMLHttpRequest();
    xhr_cart.onreadystatechange = () => {
        if (xhr_cart.readyState === 4) {
            if (xhr_cart.status === 200) {
                let cartId = xhr_cart.responseText
                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 201) {
                            console.log(xhr.responseText);
                            let ticketCode = JSON.parse(xhr.responseText).ticket.code;
                            window.location.href = `../tickets/${ticketCode}`;
                        } else {
                            toastPurchaseCartFail.classList.add('show');
                            setTimeout(() => {
                                toastPurchaseCartFail.classList.remove('show');
                            }, 10000);
                        }
                    }
                }
                xhr.open('POST', `../api/carts/${cartId}/purchase`, true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send();
            } else {
                toastPurchaseCartFail.classList.add('show');
                setTimeout(() => {
                    toastPurchaseCartFail.classList.remove('show');
                }, 10000);
            }
        }
    }
    xhr_cart.open('GET', `../api/sessions/user/cart`, true);
    xhr_cart.setRequestHeader('Content-Type', 'application/json');
    xhr_cart.send();
}