// Complete cart functionality - handles all cart operations across pages
let cart = [];
let currentFilter = 'all';

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    updateCartCount();
    
    // If we're on the cart page, update the display
    if (document.getElementById('cart-items-container')) {
        updateCartDisplay();
    }
});

function loadCart() {
    const savedCart = localStorage.getItem('hungryhoppers_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    } else {
        cart = [];
    }
}

function saveCart() {
    localStorage.setItem('hungryhoppers_cart', JSON.stringify(cart));
    console.log('Cart saved:', cart);
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Filter menu items (for menu page)
function filterMenu(category) {
    currentFilter = category;
    
    // Update active filter card
    document.querySelectorAll('.filter-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Find the clicked filter card and make it active
    const filterCards = document.querySelectorAll('.filter-card');
    filterCards.forEach(card => {
        if (card.onclick && card.onclick.toString().includes(category)) {
            card.classList.add('active');
        }
    });
    
    // Update section title
    const titles = {
        'all': 'All Menu Items',
        'burger': 'Burgers',
        'pizza': 'Pizzas',
        'coffee': 'Coffee',
        'drinks': 'Drinks',
        'ice-cream': 'Ice Cream',
        'seafood': 'Sea Food',
        'healthy': 'Healthy Options'
    };
    
    const titleElement = document.getElementById('menu-section-title');
    if (titleElement) {
        titleElement.textContent = titles[category];
    }
    
    // Show/hide menu items based on category
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Add item to cart (with instructions)
function addToCart(itemName, itemPrice) {
    console.log('Adding to cart:', itemName, itemPrice);
    
    const instructions = prompt(`Add any special instructions for ${itemName}:`, "");
    
    const existingItem = cart.find(cartItem => 
        cartItem.name === itemName && cartItem.instructions === (instructions || "")
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            price: itemPrice,
            quantity: 1,
            instructions: instructions || ""
        });
    }
    
    saveCart();
    updateCartCount();
    
    console.log('Cart after adding:', cart);
    
    // Show success message
    showAddToCartMessage(itemName);
}

// Show add to cart success message
function showAddToCartMessage(itemName) {
    const message = document.createElement('div');
    message.className = 'cart-success-message';
    message.innerHTML = `
        <div class="success-content">
            <span>✓</span>
            <span>${itemName} added to cart!</span>
        </div>
    `;
    
    // Add styles
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for success message
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .success-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .success-content span:first-child {
        font-size: 1.2rem;
        font-weight: bold;
    }
`;
document.head.appendChild(style);

// Cart page specific functions
function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartEmpty = document.getElementById('cart-empty');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartItemsContainer = document.getElementById('cart-items-container');
    
    // Update cart count in navbar
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
    
    // Show/hide empty cart message
    if (cart.length === 0) {
        if (cartEmpty) cartEmpty.style.display = 'block';
        if (cartItemsList) cartItemsList.style.display = 'none';
    } else {
        if (cartEmpty) cartEmpty.style.display = 'none';
        if (cartItemsList) cartItemsList.style.display = 'block';
    }
    
    // Clear container
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        
        // Populate cart items
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <div class="item-info">
                    <img src="${getItemImage(item.name)}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/60x60?text=Food'">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        ${item.instructions ? `<div class="item-instructions">${item.instructions}</div>` : ''}
                    </div>
                </div>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="decreaseQuantity(${index})" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="increaseQuantity(${index})">+</button>
                </div>
                <div class="price-cell">Rs. ${item.price.toFixed(2)}</div>
                <div class="total-cell">Rs. ${itemTotal.toFixed(2)}</div>
                <button class="delete-btn" onclick="removeFromCart(${index})">🗑️</button>
            `;
            
            cartItemsContainer.appendChild(cartItemDiv);
        });
    }
    
    // Update summary
    updateSummary();
}

// Get item image based on name
function getItemImage(itemName) {
    const imageMap = {
        'Classic Burger': '../images/classic.jpg',
        'Cheese Burger': '../images/cheese burger.jpg',
        'Chicken Burger': '../images/chicken.jpg',
        'Loaded Burger': '../images/loaded.jpg',
        'Margherita Pizza': '../images/margherita.jpg',
        'Pepperoni Pizza': '../images/pepporoni.jpg',
        'Cheese Burst Pizza': '../images/cheese burst.jpg',
        'Fungi Pizza': '../images/mushroom.jpg',
        'Espresso': '../images/espresso.jpg',
        'Cappuccino': '../images/cappauccino.jpg',
        'Latte': '../images/latte.jpg',
        'Mocha': '../images/mocha.jpg',
        'Jameson': '../images/jameson.jpg',
        'Jack Daniels': '../images/jd.jpg',
        'Red Wine': '../images/red wine.jpg',
        'Absolut.': '../images/absolut.jpg',
        'Vanilla Ice Cream': '../images/vanilla.jpg',
        'Chocolate Ice Cream': '../images/chocolate.jpg',
        'Grilled Salmon': '../images/salmon.jpg',
        'Fish Curry': '../images/fish curry.jpg',
        'Lobster': '../images/lobster.jpg',
        'Shrimp': '../images/shrimp.jpg',
        'Green Salad': '../images/green salad.jpg',
        'Fruit Bowl': '../images/fruit bowl.jpg'
    };
    
    return imageMap[itemName] || 'https://via.placeholder.com/60x60?text=Food';
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    
    // If on cart page, update display
    if (document.getElementById('cart-items-container')) {
        updateCartDisplay();
    }
}

// Decrease item quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        saveCart();
        updateCartCount();
        
        // If on cart page, update display
        if (document.getElementById('cart-items-container')) {
            updateCartDisplay();
        }
    }
}

// Increase item quantity
function increaseQuantity(index) {
    cart[index].quantity += 1;
    saveCart();
    updateCartCount();
    
    // If on cart page, update display
    if (document.getElementById('cart-items-container')) {
        updateCartDisplay();
    }
}

// Update summary section (cart page only)
function updateSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 50;
    const taxRate = 0.13;
    const tax = subtotal * taxRate;
    const total = subtotal + deliveryFee + tax;
    
    const summaryCount = document.getElementById('summary-count');
    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryTax = document.getElementById('summary-tax');
    const summaryTotal = document.getElementById('summary-total');
    
    if (summaryCount) summaryCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (summarySubtotal) summarySubtotal.textContent = subtotal.toFixed(2);
    if (summaryTax) summaryTax.textContent = tax.toFixed(2);
    if (summaryTotal) summaryTotal.textContent = total.toFixed(2);
}

// Clear entire cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        saveCart();
        updateCartCount();
        
        // If on cart page, update display
        if (document.getElementById('cart-items-container')) {
            updateCartDisplay();
        }
    }
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 50;
    const tax = subtotal * 0.13;
    const total = subtotal + deliveryFee + tax;
    
    alert(`Order Summary:\n\nItems: ${cart.length}\nSubtotal: Rs. ${subtotal.toFixed(2)}\nDelivery Fee: Rs. ${deliveryFee.toFixed(2)}\nTax: Rs. ${tax.toFixed(2)}\nTotal: Rs. ${total.toFixed(2)}\n\nThank you for your order!`);
    
    // Clear cart after checkout
    cart = [];
    saveCart();
    updateCartCount();
    
    // If on cart page, update display
    if (document.getElementById('cart-items-container')) {
        updateCartDisplay();
    }
}

// Legacy popup functions (keeping for backward compatibility)
function toggleCartPopup() {
    const popup = document.getElementById("cart-popup");
    const overlay = document.getElementById("cart-overlay");
    
    if (popup && overlay) {
        if (popup.style.display === "none" || popup.style.display === "") {
            popup.style.display = "block";
            overlay.style.display = "block";
        } else {
            popup.style.display = "none";
            overlay.style.display = "none";
        }
    }
}

function closeCart() {
    const popup = document.getElementById("cart-popup");
    const overlay = document.getElementById("cart-overlay");
    
    if (popup && overlay) {
        popup.style.display = "none";
        overlay.style.display = "none";
    }
}

// Utility functions for external access
function getCartData() {
    return cart;
}

function setCartData(newCart) {
    cart = newCart;
    saveCart();
    updateCartCount();
}

// Initialize cart data sharing between pages
//window.cartData = cart;