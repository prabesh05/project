let cart = [];
let currentFilter = 'all';

// Filter menu items
function filterMenu(category) {
  currentFilter = category;
  
  // Update active filter card
  document.querySelectorAll('.filter-card').forEach(card => {
    card.classList.remove('active');
  });
  event.target.closest('.filter-card').classList.add('active');
  
  // Update section title
  const titles = {
    'all': 'All Menu Items',
    'burger': 'Burgers',
    'pizza': 'Pizzas',
    'coffee': 'Coffee',
    'wine': 'Wines',
    'ice-cream': 'Ice Cream',
    'seafood': 'Sea Food',
    'healthy': 'Healthy Options'
  };
  
  document.getElementById('menu-section-title').textContent = titles[category];
  
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

//  Add item to cart (with instructions)
function addToCart(itemName, itemPrice) {
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

  updateCartDisplay();
}


// Remove item from cart
function removeFromCart(itemName) {
  const itemIndex = cart.findIndex(cartItem => cartItem.name === itemName);
  
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    updateCartDisplay();
  }
}

// Decrease item quantity in cart
function decreaseQuantity(itemName) {
  const existingItem = cart.find(cartItem => cartItem.name === itemName);
  
  if (existingItem) {
    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1;
    } else {
      // If quantity is 1, remove the item completely
      removeFromCart(itemName);
    }
    updateCartDisplay();
  }
}

// Increase item quantity in cart
function increaseQuantity(itemName) {
  const existingItem = cart.find(cartItem => cartItem.name === itemName);
  
  if (existingItem) {
    existingItem.quantity += 1;
    updateCartDisplay();
  }
}

// Update cart display
function updateCartDisplay() {
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  const cartItems = document.querySelector('#cart-items tbody');
  
  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  
  // Update cart items table
  cartItems.innerHTML = '';
  let total = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    const row = `
      <tr>
        <td>${item.name}</td>
        <td>
          <div class="quantity-controls">
            <button onclick="decreaseQuantity('${item.name}')" class="qty-btn">-</button>
            <span>${item.quantity}</span>
            <button onclick="increaseQuantity('${item.name}')" class="qty-btn">+</button>
          </div>
        </td>
        <td>Rs ${item.price.toFixed(2)}</td>
        <td>Rs ${itemTotal.toFixed(2)}</td>
        <td>
          <button onclick="removeFromCart('${item.name}')" class="delete-btn">🗑️</button>
        </td>
      </tr>
    `;
    cartItems.innerHTML += row;
  });
  
  cartTotal.textContent = total.toFixed(2);
}

// Toggle cart popup
function toggleCartPopup() {
  const popup = document.getElementById("cart-popup");
  const overlay = document.getElementById("cart-overlay");
  
  if (popup.style.display === "none" || popup.style.display === "") {
    popup.style.display = "block";
    overlay.style.display = "block";
  } else {
    popup.style.display = "none";
    overlay.style.display = "none";
  }
}

// Close cart
function closeCart() {
  document.getElementById("cart-popup").style.display = "none";
  document.getElementById("cart-overlay").style.display = "none";
}

// Clear entire cart
function clearCart() {
  cart = [];
  updateCartDisplay();
}