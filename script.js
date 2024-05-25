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

// Initialize Stripe with your publishable key
const stripe = Stripe('your-publishable-key-here'); // Replace with your Stripe publishable key

// Create an instance of Elements
const elements = stripe.elements();

// Create an instance of the card Element
const card = elements.create('card');

// Add an instance of the card Element into the `card-element` <div>
if (document.getElementById('card-element')) {
    card.mount('#card-element');
}

// Handle real-time validation errors from the card Element
card.on('change', ({error}) => {
    const displayError = document.getElementById('card-errors');
    if (error) {
        displayError.textContent = error.message;
    } else {
        displayError.textContent = '';
    }
});

// Handle form submission
const form = document.getElementById('payment-form');
if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const { token, error } = await stripe.createToken(card);
    
        if (error) {
            // Inform the customer that there was an error
            const errorElement = document.getElementById('card-errors');
            errorElement.textContent = error.message;
        } else {
            // Send the token to your server
            stripeTokenHandler(token);
        }
    });
}

// Submit the token and the rest of your form to your server
function stripeTokenHandler(token) {
    const form = document.getElementById('payment-form');
    const hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);

    // Submit the form
    form.submit();
}

