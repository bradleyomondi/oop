// Product Class
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// ShoppingCartItem Class
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

// ShoppingCart Class
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new ShoppingCartItem(product, quantity));
        }
        this.updateCartDisplay();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.updateCartDisplay();
    }

    clearCart() {
        this.items = [];
        this.updateCartDisplay();
    }

    getTotalItems() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    updateCartDisplay() {
        const cartElement = document.getElementById('cart');
        cartElement.innerHTML = this.items.length 
            ? this.items.map(item => 
                `<li>${item.product.name} (x${item.quantity}) - $${item.getTotalPrice()} 
                <button onclick="removeFromCart(${item.product.id})">Remove</button></li>`
            ).join('')
            : "<li>Cart is empty</li>";
    }
}

// Instantiate Shopping Cart
const cart = new ShoppingCart();
const products = [
    new Product(1, "Laptop", 1200),
    new Product(2, "Headphones", 150),
];

// Function to display available products
function displayProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = products.map(product => 
        `<div class="product">
            <span>${product.name} - $${product.price}</span>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
        </div>`
    ).join('');
}

// Function to create a new product dynamically
function createNewProduct() {
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    
    if (name && price > 0) {
        const id = products.length + 1;
        const newProduct = new Product(id, name, price);
        products.push(newProduct);
        displayProducts();
    } else {
        alert("Please enter valid product details.");
    }
}

// Event Handlers
function addToCart(id, name, price) {
    const product = products.find(p => p.id === id) || new Product(id, name, price);
    cart.addItem(product);
}

function removeFromCart(id) {
    cart.removeItem(id);
}

function clearCart() {
    cart.clearCart();
}

function getTotalItems() {
    alert(`Total items in cart: ${cart.getTotalItems()}`);
}

// Initialize product list on page load
document.addEventListener("DOMContentLoaded", displayProducts);
