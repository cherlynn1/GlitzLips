// script.js

// Function to add items to the cart
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = { name: productName, price: productPrice };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to your cart`);
}

// Function to display cart items
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalDiv.innerHTML = '';
        return;
    }

    let total = 0;
    cartItemsDiv.innerHTML = cart.map(product => {
        total += product.price;
        return `
            <div class="cart-item">
                <p>${product.name} - $${product.price.toFixed(2)}</p>
            </div>
        `;
    }).join('');
    
    cartTotalDiv.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
}

// Function to handle checkout
function checkout() {
    alert('Proceeding to checkout...');
    // Here you would normally handle the checkout process
    // For this example, we'll just clear the cart
    localStorage.removeItem('cart');
    displayCart();
}

// Display cart items when the cart page loads
if (window.location.pathname.endsWith('cart.html')) {
    displayCart();
}
