// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));

        window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
        });
    });
});

// Display alert message when clicking on "Contact Us" section
document.querySelector('#contact').addEventListener('click', function () {
    alert('Please contact us at info@glitzlips.com');
document.addEventListener('DOMContentLoaded', function() {
    // Add checkout-related JavaScript code here
});
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Validate form fields
    // Perform payment processing (e.g., through a payment gateway)
    // Update inventory and generate order confirmation
    // Redirect to confirmation page or display confirmation message
});

