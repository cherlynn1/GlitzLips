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
});
