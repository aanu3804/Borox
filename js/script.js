document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    if (!darkModeToggle) {
        console.error("Dark mode toggle button not found!");
        return;
    }

    // Check dark mode status from LocalStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = "☀️"; // Sun icon
    } else {
        darkModeToggle.textContent = "🌙"; // Moon icon
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.textContent = "☀️";
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.textContent = "🌙";
        }
    });
});
function filterHotels() {
    const searchInput = document.getElementById('hotel-search'); // fixed ID
    if (!searchInput) {
        console.error("Hotel search input not found!");
        return;
    }

    const query = searchInput.value.toLowerCase();
    const hotelCards = document.querySelectorAll('.hotel-card');

    hotelCards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = name.includes(query) ? 'block' : 'none';
    });
}
function filterFood() {
    const searchInput = document.getElementById('food-search');
    if (!searchInput) {
        console.error("Food search input not found!");
        return;
    }

    const query = searchInput.value.toLowerCase();
    const foodCards = document.querySelectorAll('.food-card');

    foodCards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = name.includes(query) ? 'block' : 'none';
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

// Search Functionality
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const restaurants = document.querySelectorAll('.restaurant-card'); 
const foodItems = document.querySelectorAll('.category'); 

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        let query = searchBar.value.toLowerCase();
    
        restaurants.forEach((restaurant) => {
            let name = restaurant.querySelector('h3').innerText.toLowerCase();
            restaurant.style.display = name.includes(query) ? 'block' : 'none';
        });
    
        foodItems.forEach((item) => {
            let name = item.innerText.toLowerCase();
            item.style.display = name.includes(query) ? 'block' : 'none';
        });
    });
}

// Cart System
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(itemName, price) {
    cart.push({ name: itemName, price: price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    showCartPopup(itemName);
}
function showCartPopup(itemName) {
    // Create popup element
    const popup = document.createElement('div');
    popup.className = 'cart-popup';
    popup.innerHTML = `<p>✅ "${itemName}" added to cart!</p>`;

    document.body.appendChild(popup);

    // Fade out after 2 seconds
    setTimeout(() => {
        popup.classList.add('fade-out');
        setTimeout(() => popup.remove(), 500);
    }, 2000);
}


function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartContainer || !cartTotal) {
        console.error("Cart elements not found!");
        return;
    }

    cartContainer.innerHTML = "";
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>₹${item.price}</span>
                <button onclick="removeFromCart(${index})">❌</button>
            </div>`;
    });

    cartTotal.innerText = total;
}


document.addEventListener('DOMContentLoaded', function () {
    const checkoutBtn = document.getElementById('checkout-btn');

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert("Thanks for purchasing! 🎉");
            localStorage.removeItem('cart');
            cart = [];
            updateCartUI();
        });
        
    }
});


const placeOrderBtn = document.getElementById('place-order');
if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', () => {
        alert("Order placed successfully! 🚀");
        localStorage.removeItem('cart');
        window.location.href = "index.html"; // Redirect to Home Page
    });
}
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".category").forEach(category => {
        category.addEventListener("click", () => {
            const categoryName = category.textContent.trim().toLowerCase();
            window.location.href = `food.html?category=${categoryName}`;
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".restaurant-card").forEach(card => {
        card.addEventListener("click", () => {
            const restaurantName = card.querySelector("h3").textContent.trim().toLowerCase().replace(/\s+/g, "-");
            window.location.href = `hotels.html?restaurant=${restaurantName}`;
        });
    });
});

function showMenu(restaurant, event) {
    const menuData = {
        "city-hearts": {
            name: "City Hearts Food Point",
            items: ["Chicken Biriyani", "Butter Naan", "Paneer Tikka", "Dal Makhani", "Gulab Jamun"]
        },
        "sai-ram": {
            name: "Sai Ram Parlour",
            items: ["Masala Dosa", "Idli Sambar", "Medu Vada", "Vegetable Upma", "Chai"]
        },
        "best-western": {
            name: "Best Western",
            items: ["Sushi Rolls", "Teriyaki Chicken", "Miso Soup", "Ramen Noodles", "Matcha Ice Cream"]
        }
    };

    // Update menu details
    document.getElementById("restaurant-name").innerText = menuData[restaurant].name;
    const menuList = document.getElementById("menu-items");
    menuList.innerHTML = "";
    menuData[restaurant].items.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item;
        menuList.appendChild(li);
    });

    // Get button position (event.target = clicked button)
    const buttonRect = event.target.getBoundingClientRect();
    
    // Set popup position near the clicked button
    const popup = document.getElementById("menu-popup");
    popup.style.left = `${buttonRect.left + window.scrollX}px`;
    popup.style.top = `${buttonRect.bottom + window.scrollY + 10}px`;  // 10px below the button

    // Show popup
    popup.style.display = "block";
}

function closeMenu() {
    document.getElementById("menu-popup").style.display = "none";
}

// Load more restaurants (Dummy function for now)
function loadMoreRestaurants() {
    alert("Loading more restaurants... (You can replace this with actual data fetching)");
}



