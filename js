// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

// Initialize the application
function initApp() {
    // Load featured products on home page
    if (document.querySelector('#featured-products')) {
        loadFeaturedProducts();
    }
    
    // Load all products on products page
    if (document.querySelector('#all-products')) {
        loadAllProducts();
    }
    
    // Load product details if on product detail page
    if (document.querySelector('#product-detail')) {
        loadProductDetails();
    }
    
    // Initialize cart functionality
    initCart();
    
    // Set up event listeners
    setupEventListeners();
}

// Load featured products
function loadFeaturedProducts() {
    // In a real app, this would fetch from your Java backend
    // For now, we'll use mock data
    const featuredProducts = [
        {
            id: 1,
            name: "Wireless Headphones",
            price: 99.99,
            image: "images/headphones.jpg",
            category: "electronics"
        },
        {
            id: 2,
            name: "Smart Watch",
            price: 199.99,
            image: "images/smartwatch.jpg",
            category: "electronics"
        },
        {
            id: 3,
            name: "Cotton T-Shirt",
            price: 24.99,
            image: "images/tshirt.jpg",
            category: "clothing"
        }
    ];
    
    const productsGrid = document.querySelector('#featured-products');
    productsGrid.innerHTML = '';
    
    featuredProducts.forEach(product => {
        productsGrid.appendChild(createProductCard(product));
    });
}

// Load all products
function loadAllProducts() {
    // In a real app, this would fetch from your Java backend
    // For now, we'll use mock data
    const allProducts = [
        {
            id: 1,
            name: "Wireless Headphones",
            price: 99.99,
            image: "images/headphones.jpg",
            category: "electronics",
            description: "High-quality wireless headphones with noise cancellation."
        },
        {
            id: 2,
            name: "Smart Watch",
            price: 199.99,
            image: "images/smartwatch.jpg",
            category: "electronics",
            description: "Feature-rich smartwatch with health monitoring."
        },
        {
            id: 3,
            name: "Cotton T-Shirt",
            price: 24.99,
            image: "images/tshirt.jpg",
            category: "clothing",
            description: "Comfortable 100% cotton t-shirt available in multiple colors."
        },
        {
            id: 4,
            name: "Running Shoes",
            price: 89.99,
            image: "images/shoes.jpg",
            category: "clothing",
            description: "Lightweight running shoes with cushioned soles."
        },
        {
            id: 5,
            name: "Coffee Maker",
            price: 49.99,
            image: "images/coffeemaker.jpg",
            category: "home",
            description: "Programmable coffee maker with timer function."
        },
        {
            id: 6,
            name: "Blender",
            price: 39.99,
            image: "images/blender.jpg",
            category: "home",
            description: "High-speed blender for smoothies and food preparation."
        }
    ];
    
    const productsGrid = document.querySelector('#all-products');
    productsGrid.innerHTML = '';
    
    allProducts.forEach(product => {
        productsGrid.appendChild(createProductCard(product));
    });
    
    // Set up filter and sort functionality
    setupFilters();
}

// Load product details
function loadProductDetails() {
    // In a real app, you would get the product ID from the URL
    // and fetch the details from your Java backend
    const productId = new URLSearchParams(window.location.search).get('id');
    
    // For now, we'll use mock data
    const product = {
        id: productId || 1,
        name: "Wireless Headphones",
        price: 99.99,
        image: "images/headphones.jpg",
        category: "electronics",
        description: "High-quality wireless headphones with noise cancellation. Perfect for music lovers and professionals who need to focus. Features include 30-hour battery life, Bluetooth 5.0, and comfortable over-ear design."
    };
    
    const productDetailContainer = document.querySelector('#product-detail');
    productDetailContainer.innerHTML = createProductDetail(product));
}

// Create product card HTML
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description ? product.description.substring(0, 60) + '...' : ''}</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    
    // Make the product card clickable to view details
    productCard.addEventListener('click', function(e) {
        // Don't navigate if clicking on the button
        if (!e.target.classList.contains('add-to-cart')) {
            window.location.href = `product-detail.html?id=${product.id}`;
        }
    });
    
    return productCard;
}

// Create product detail HTML
function createProductDetail(product) {
    return `
        <div class="product-detail-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-detail-info">
            <h2>${product.name}</h2>
            <div class="product-detail-price">$${product.price.toFixed(2)}</div>
            <div class="product-detail-description">
                <p>${product.description}</p>
            </div>
            <div class="quantity-selector">
                <label for="quantity">Quantity:</label>
                <input type="number" id="quantity" value="1" min="1">
            </div>
            <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
}

// Set up event listeners
function setupEventListeners() {
    // Add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.getAttribute('data-id');
            const quantity = document.getElementById('quantity') ? parseInt(document.getElementById('quantity').value) : 1;
            addToCart(productId, quantity);
        }
    });
}

// Set up filter and sort functionality
function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const sortBy = document.getElementById('sort-by');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterAndSortProducts();
        });
    }
    
    if (sortBy) {
        sortBy.addEventListener('change', function() {
            filterAndSortProducts();
        });
    }
}

// Filter and sort products
function filterAndSortProducts() {
    // In a real app, you would send filter/sort parameters to your Java backend
    // For this demo, we'll filter/sort the existing products client-side
    
    const categoryFilter = document.getElementById('category-filter').value;
    const sortBy = document.getElementById('sort-by').value;
    const productCards = Array.from(document.querySelectorAll('.product-card'));
    
    // Filter by category
    let filteredProducts = productCards;
    if (categoryFilter !== 'all') {
        filteredProducts = productCards.filter(card => {
            const productId = card.querySelector('.add-to-cart').getAttribute('data-id');
            // In a real app, you would have the category stored in a data attribute
            // For this demo, we'll just show all products
            return true;
        });
    }
    
    // Sort products
    filteredProducts.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
        const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
        const nameA = a.querySelector('h3').textContent;
        const nameB = b.querySelector('h3').textContent;
        
        switch(sortBy) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            case 'name':
                return nameA.localeCompare(nameB);
            default:
                return 0;
        }
    });
    
    // Re-append sorted products
    const productsGrid = document.querySelector('#all-products');
    productsGrid.innerHTML = '';
    filteredProducts.forEach(card => productsGrid.appendChild(card));
}

// Initialize cart functionality
function initCart() {
    // Load cart from localStorage if it exists
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    
    // Display cart items if on cart page
    if (document.querySelector('#cart-items')) {
        displayCartItems();
    }
    
    // Display checkout items if on checkout page
    if (document.querySelector('#checkout-items')) {
        displayCheckoutItems();
    }
    
    // Set up place order button if on checkout page
    if (document.getElementById('place-order')) {
        document.getElementById('place-order').addEventListener('click', placeOrder);
    }
}

// Add to cart function
function addToCart(productId, quantity = 1) {
    // In a real app, you would fetch product details from your Java backend
    // For now, we'll use mock data
    const products = [
        {
            id: 1,
            name: "Wireless Headphones",
            price: 99.99,
            image: "images/headphones.jpg"
        },
        {
            id: 2,
            name: "Smart Watch",
            price: 199.99,
            image: "images/smartwatch.jpg"
        },
        {
            id: 3,
            name: "Cotton T-Shirt",
            price: 24.99,
            image: "images/tshirt.jpg"
        },
        {
            id: 4,
            name: "Running Shoes",
            price: 89.99,
            image: "images/shoes.jpg"
        },
        {
            id: 5,
            name: "Coffee Maker",
            price: 49.99,
            image: "images/coffeemaker.jpg"
        },
        {
            id: 6,
            name: "Blender",
            price: 39.99,
            image: "images/blender.jpg"
        }
    ];
    
    const product = products.find(p => p.id == productId);
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart'));
    const existingItem = cart.find(item => item.id == productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show confirmation
    alert(`${quantity} ${product.name} added to cart!`);
    
    // Update cart display if on cart page
    if (document.querySelector('#cart-items')) {
        displayCartItems();
    }
    
    // Update checkout display if on checkout page
    if (document.querySelector('#checkout-items')) {
        displayCheckoutItems();
    }
}

// Display cart items
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartItemsContainer = document.querySelector('#cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        subtotalElement.textContent = '$0.00';
        totalElement.textContent = '$5.00';
        return;
    }
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <input type="number" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
                <div class="cart-item-remove" data-id="${item.id}">Remove</div>
            </div>
            <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Calculate totals
    const shipping = 5.00;
    const total = subtotal + shipping;
    
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
    
    // Set up quantity change and remove event listeners
    setupCartItemEvents();
}

// Display checkout items
function displayCheckoutItems() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const checkoutItemsContainer = document.querySelector('#checkout-items');
    const checkoutTotalElement = document.getElementById('checkout-total');
    
    if (!checkoutItemsContainer) return;
    
    checkoutItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        checkoutItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        checkoutTotalElement.textContent = '$0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const checkoutItem = document.createElement('div');
        checkoutItem.className = 'checkout-item';
        checkoutItem.innerHTML = `
            <div class="checkout-item-name">${item.name} (${item.quantity})</div>
            <div class="checkout-item-price">$${itemTotal.toFixed(2)}</div>
        `;
        
        checkoutItemsContainer.appendChild(checkoutItem);
    });
    
    // Add shipping
    total += 5.00;
    
    checkoutTotalElement.textContent = `$${total.toFixed(2)}`;
}

// Set up cart item events (quantity change, remove)
function setupCartItemEvents() {
    // Quantity decrease buttons
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            updateCartItemQuantity(productId, -1);
        });
    });
    
    // Quantity increase buttons
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            updateCartItemQuantity(productId, 1);
        });
    });
    
    // Quantity input changes
    document.querySelectorAll('.cart-item-quantity input').forEach(input => {
        input.addEventListener('change', function() {
            const productId = this.getAttribute('data-id');
            const newQuantity = parseInt(this.value);
            
            if (newQuantity < 1) {
                this.value = 1;
                return;
            }
            
            updateCartItemQuantity(productId, 0, newQuantity);
        });
    });
    
    // Remove item buttons
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            removeCartItem(productId);
        });
    });
}

// Update cart item quantity
function updateCartItemQuantity(productId, change, newQuantity = null) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    const itemIndex = cart.findIndex(item => item.id == productId);
    
    if (itemIndex === -1) return;
    
    if (newQuantity !== null) {
        cart[itemIndex].quantity = newQuantity;
    } else {
        cart[itemIndex].quantity += change;
        
        // Ensure quantity doesn't go below 1
        if (cart[itemIndex].quantity < 1) {
            cart[itemIndex].quantity = 1;
        }
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Remove item from cart
function removeCartItem(productId) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter(item => item.id != productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    
    // Also update checkout page if open
    if (document.querySelector('#checkout-items')) {
        displayCheckoutItems();
    }
}

// Place order function
function placeOrder() {
    // Validate forms
    const shippingForm = document.getElementById('shipping-form');
    const paymentForm = document.getElementById('payment-form');
    
    let isValid = true;
    
    // Validate shipping form
    shippingForm.querySelectorAll('[required]').forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    // Validate payment form
    paymentForm.querySelectorAll('[required]').forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // In a real app, you would send the order to your Java backend
    // For this demo, we'll just show a confirmation
    
    // Get order details
    const cart = JSON.parse(localStorage.getItem('cart'));
    const shippingInfo = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        zip: document.getElementById('zip').value
    };
    
    const paymentInfo = {
        cardName: document.getElementById('card-name').value,
        cardNumber: document.getElementById('card-number').value,
        expiry: document.getElementById('expiry').value,
        cvv: document.getElementById('cvv').value
    };
    
    // Calculate total
    let total = 5.00; // Shipping
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    
    // In a real app, you would send this data to your backend
    console.log('Order placed:', {
        shippingInfo,
        paymentInfo,
        items: cart,
        total: total.toFixed(2)
    });
    
    // Show confirmation
    alert('Order placed successfully! Thank you for your purchase.');
    
    // Clear cart
    localStorage.setItem('cart', JSON.stringify([]));
    
    // Redirect to home page
    window.location.href = 'index.html';
}