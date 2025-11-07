// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

// Main initialization function
function initApp() {
    // Mobile Menu Toggle
    initMobileMenu();
    
    // Smooth Scrolling
    initSmoothScrolling();
    
    // Order Modal Functionality
    initOrderModal();
    
    // Contact Form Handling
    initContactForm();
    
    // Testimonial Slider
    initTestimonialSlider();
    
    // Gallery Lightbox
    initGalleryLightbox();
    
    // Newsletter Subscription
    initNewsletter();
    
    // Image Loading and Animation
    initImageAnimations();
    
    // Navbar Scroll Effect
    initNavbarScroll();
    
    // Button Event Listeners
    initButtonEvents();
    
    // Product Cart Functionality
    initCartSystem();
}

// Mobile Menu Functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Order Modal Functionality
function initOrderModal() {
    const orderModal = document.getElementById('orderModal');
    const orderButtons = document.querySelectorAll('#orderNowBtn, .btn-signup, .product-card .btn-primary');
    const closeModal = document.querySelector('.modal .close');
    
    // Open modal events
    orderButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // If it's a product card button, pre-select the product
                if (btn.closest('.product-card')) {
                    const productName = btn.closest('.product-card').querySelector('h3').textContent;
                    preSelectProduct(productName);
                }
                
                orderModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        }
    });
    
    // Close modal events
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            orderModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === orderModal) {
            orderModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Order form submission
    const orderForm = document.querySelector('.order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processOrder();
        });
    }
}

// Pre-select product in order form
function preSelectProduct(productName) {
    const productSelect = document.getElementById('orderProduct');
    if (!productSelect) return;
    
    const options = Array.from(productSelect.options);
    const matchingOption = options.find(option => 
        option.text.toLowerCase().includes(productName.toLowerCase())
    );
    
    if (matchingOption) {
        productSelect.value = matchingOption.value;
    }
}

// Process Order
function processOrder() {
    const orderForm = document.querySelector('.order-form');
    const submitBtn = orderForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Order...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = {
        product: document.getElementById('orderProduct').value,
        quantity: document.getElementById('quantity').value,
        delivery: document.getElementById('delivery').value
    };
    
    // Simulate order processing
    setTimeout(() => {
        // Show success message
        showNotification(`Order placed successfully! We'll contact you within 24 hours to confirm delivery.`, 'success');
        
        // Close modal
        document.getElementById('orderModal').style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset form
        orderForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Add to cart (in a real app, this would update a shopping cart)
        addToCart(formData);
    }, 3000);
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processContactForm();
        });
    }
}

// Process Contact Form
function processContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    // Show initial testimonial
    showTestimonial(currentTestimonial);

    // Auto-advance testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Show current testimonial
        testimonials[index].classList.add('active');
    }
}

// Gallery Lightbox
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const title = this.querySelector('h4').textContent;
            const description = this.querySelector('p').textContent;
            
            openLightbox(imgSrc, title, description);
        });
    });
    
    // Create lightbox HTML
    createLightboxHTML();
}

// Create Lightbox HTML
function createLightboxHTML() {
    const lightboxHTML = `
        <div class="lightbox" id="lightbox">
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="" alt="" class="lightbox-image">
                <div class="lightbox-caption">
                    <h3></h3>
                    <p></p>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    // Add lightbox event listeners
    const lightbox = document.getElementById('lightbox');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Open Lightbox
function openLightbox(imgSrc, title, description) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxTitle = lightbox.querySelector('.lightbox-caption h3');
    const lightboxDesc = lightbox.querySelector('.lightbox-caption p');
    
    lightboxImg.src = imgSrc;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent = description;
    
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Newsletter Subscription
function initNewsletter() {
    const newsletterForms = document.querySelectorAll('.newsletter');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (validateEmail(email)) {
                subscribeNewsletter(email);
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    });
}

// Validate Email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Subscribe to Newsletter
function subscribeNewsletter(email) {
    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you for subscribing to our newsletter!', 'success');
    }, 1000);
}

// Image Animations
function initImageAnimations() {
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading class
        img.classList.add('loading');
        
        // Remove loading class when image is loaded
        if (img.complete) {
            img.classList.remove('loading');
        } else {
            img.addEventListener('load', function() {
                this.classList.remove('loading');
            });
            
            img.addEventListener('error', function() {
                this.classList.remove('loading');
                this.alt = 'Image failed to load';
            });
        }
    });
    
    // Add scroll animations
    const animatedElements = document.querySelectorAll('.product-card, .feature, .gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(0px)';
        }
    });
}

// Button Events
function initButtonEvents() {
    // Learn More Button
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            showNotification('Our story video would play here!', 'info');
        });
    }
    
    // Login Button
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            showNotification('Login functionality would open here.', 'info');
        });
    }
    
    // Read Our Story Button
    const readStoryBtn = document.querySelector('.about .btn-primary');
    if (readStoryBtn) {
        readStoryBtn.addEventListener('click', () => {
            document.getElementById('about').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
}

// Cart System
function initCartSystem() {
    // Initialize cart in localStorage if not exists
    if (!localStorage.getItem('avocadoCart')) {
        localStorage.setItem('avocadoCart', JSON.stringify([]));
    }
    
    // Add to cart buttons
    document.querySelectorAll('.product-card .btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            addProductToCart(productCard);
        });
    });
}

// Add Product to Cart
function addProductToCart(productCard) {
    const product = {
        name: productCard.querySelector('h3').textContent,
        price: productCard.querySelector('.price').textContent,
        image: productCard.querySelector('img').src,
        quantity: 1
    };
    
    const cart = JSON.parse(localStorage.getItem('avocadoCart'));
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(product);
    }
    
    localStorage.setItem('avocadoCart', JSON.stringify(cart));
    
    showNotification(`${product.name} added to cart!`, 'success');
    updateCartBadge();
}

// Update Cart Badge
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('avocadoCart'));
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Create or update cart badge
    let cartBadge = document.querySelector('.cart-badge');
    if (!cartBadge) {
        cartBadge = document.createElement('span');
        cartBadge.className = 'cart-badge';
        document.querySelector('.nav-buttons').appendChild(cartBadge);
    }
    
    if (totalItems > 0) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = 'flex';
    } else {
        cartBadge.style.display = 'none';
    }
}

// Add to Cart function for order modal
function addToCart(orderData) {
    const productSelect = document.getElementById('orderProduct');
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    const productName = selectedOption.text.split(' - ')[0];
    const productPrice = selectedOption.text.split(' - ')[1];
    
    const product = {
        name: productName,
        price: productPrice,
        quantity: parseInt(document.getElementById('quantity').value),
        delivery: document.getElementById('delivery').value
    };
    
    const cart = JSON.parse(localStorage.getItem('avocadoCart'));
    cart.push(product);
    localStorage.setItem('avocadoCart', JSON.stringify(cart));
    
    updateCartBadge();
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button event
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        hideNotification(notification);
    });
    
    // Click to close
    notification.addEventListener('click', (e) => {
        if (e.target === notification) {
            clearTimeout(autoRemove);
            hideNotification(notification);
        }
    });
}

// Get notification icon based on type
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    
    return icons[type] || 'info-circle';
}

// Hide notification
function hideNotification(notification) {
    notification.classList.remove('show');
    notification.classList.add('hide');
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Initialize cart badge on load
updateCartBadge();

// Add CSS for animations and notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .product-card, .feature, .gallery-item {
        opacity: 0;
    }
    
    img.loading {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
    }
    
    @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }
    
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        border-left: 4px solid var(--primary-green);
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        min-width: 300px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 10000;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.hide {
        transform: translateX(400px);
    }
    
    .notification-success {
        border-left-color: var(--primary-green);
    }
    
    .notification-error {
        border-left-color: #e74c3c;
    }
    
    .notification-warning {
        border-left-color: var(--accent-orange);
    }
    
    .notification-info {
        border-left-color: var(--accent-brown);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-right: 2rem;
    }
    
    .notification-close {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: none;
        border: none;
        cursor: pointer;
        color: var(--gray);
    }
    
    .lightbox {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 2000;
        align-items: center;
        justify-content: center;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-image {
        max-width: 100%;
        max-height: 70vh;
        border-radius: 10px;
    }
    
    .lightbox-caption {
        color: white;
        text-align: center;
        margin-top: 1rem;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    }
    
    .cart-badge {
        position: absolute;
        top: -8px;
        right: -8px;
        background: var(--accent-orange);
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 0.8rem;
        display: none;
        align-items: center;
        justify-content: center;
        font-weight: 600;
    }
    
    .nav-buttons {
        position: relative;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            background: white;
            flex-direction: column;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
        }
        
        .about-content {
            grid-template-columns: 1fr;
        }
        
        .contact-content {
            grid-template-columns: 1fr;
        }
        
        .gallery-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
        }
        
        .gallery-item.large {
            grid-column: 1;
            grid-row: auto;
        }
    }
`;
document.head.appendChild(style);