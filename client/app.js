// Variables

const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOvelay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');
const searchBtn = document.getElementById('search-btn');
const search = document.getElementById('search');
const tip = document.getElementById('tip');
const home = document.querySelector('.nav-icon')

// cart
let cart = [];
// buttons
let buttonsDOM = [];

// getting the products
class Products {
    async getProducts() {
        try {
            let result = await fetch('http://localhost:3001/products');
            let data = await result.json();
            return data;
        } catch (error) {
            console.log(error)
        }
    }
    static async getProductById(id) {
        try {
            let result = await fetch(`http://localhost:3001/products/${id}`);
            let data = await result.json();
            return data;
        } catch (error) {
            console.log(error)
        }
    }
    static async getProductByName(name) {
        try {
            let result = await fetch(`http://localhost:3001/products/name/${name}`);
            let data = await result.json();
            return data;
        } catch (error) {
            console.log(error)
        }
    }
}

// display products
class UI {
    displayProducts(products) {
        let result = '';
        products.forEach(product => {
            result += `
            <!-- single product -->
            <article class="product">
                <div class="img-container">
                    <img src=${product.url_image} alt=${product.name} class="product-img">
                    <button class="bag-btn" data-id=${product.id}>
                        <i class="fas fa-shopping-cart"></i>
                        añadir al carrito
                    </button>
                </div>
                <h3>${product.name}</h3>
                <h4>$${product.price}</h4>
            </article>
            <!-- end of single product -->
            `
        });
        productsDOM.innerHTML = result;
    }
    getBagButtons() {
        const buttons = [...document.querySelectorAll('.bag-btn')];
        buttonsDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if (inCart) {
                button.innerText = "agregado";
                button.disabled = true;
            }
                button.addEventListener('click', async (event) => {
                    event.target.innerText = "agregado";
                    event.target.disabled = true;
                    // get product
                    let [ item ] = await Products.getProductById(id)
                    let cartItem = {...item, amount: 1};
                    // add product to cart
                    cart = [...cart, cartItem];
                    // save cart in localstorage
                    Storage.saveCart(cart);
                    // set cart values
                    this.setCartValues(cart);
                    // display cart item
                    this.addCartItem(cartItem);
                    // show the cart
                    this.showCart();
                })
        })
    }
    setCartValues(cartArray) {
        let tempTotal = 0;
        let itemsTotal = 0;
        cartArray.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        })
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
    }
    addCartItem(item) {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
        <img src=${item.url_image} alt=${item.name}>
        <div>
            <h4>${item.name}</h4>
            <h5>$${item.price}</h5>
            <span class="remove-item" data-id=${item.id}>quitar</span>
        </div>
        <div>
            <i class="fas fa-chevron-up" data-id=${item.id}></i>
            <p class="item-amount">${item.amount}</p>
            <i class="fas fa-chevron-down" data-id=${item.id}></i>
        </div>
        `;
        cartContent.appendChild(div);
    }
    showCart() {
        cartOvelay.classList.add('transparentBcg');
        cartDOM.classList.add('showCart');
    }
    setupAPP() {
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        cartBtn.addEventListener('click', this.showCart);
        closeCartBtn.addEventListener('click', this.hideCart)
    }
    populateCart(cartArr) {
        cartArr.forEach(item => this.addCartItem(item))
    }
    hideCart() {
        cartOvelay.classList.remove('transparentBcg');
        cartDOM.classList.remove('showCart');
    }
    cartLogic() {
        // clear cart button
        clearCartBtn.addEventListener('click', () => {
            this.clearCart();
        })
        // cart functionality
        cartContent.addEventListener('click', (event) => {
            if(event.target.classList.contains('remove-item')) {
                let removeItem = event.target;
                let id = removeItem.dataset.id;
                cartContent.removeChild(removeItem.parentElement.parentElement);
                this.removeItem(id);
            }
            else if(event.target.classList.contains('fa-chevron-up')) {
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find(item => item.id == id);
                tempItem.amount = tempItem.amount + 1;
                Storage.saveCart(cart);
                this.setCartValues(cart);
                addAmount.nextElementSibling.innerText = tempItem.amount;
            }
            else if(event.target.classList.contains('fa-chevron-down')) {
                let lowerAmount = event.target;
                let id = lowerAmount.dataset.id;
                let tempItem = cart.find(item => item.id == id);
                tempItem.amount = tempItem.amount - 1;
                if (parseInt(tempItem.amount) > 0) {
                    Storage.saveCart(cart);
                    this.setCartValues(cart);
                    lowerAmount.previousElementSibling.innerText = tempItem.amount;
                } else {
                    cartContent.removeChild(lowerAmount.parentElement.parentElement);
                    this.removeItem(id);
                }
            }
        })
    }
    clearCart() {
        let cartItems = cart.map(item => item.id);
        cartItems.forEach(id => this.removeItem(id));
        while(cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0]);
        }
        this.hideCart();
    }
    removeItem(id) {
        cart = cart.filter(item => item.id != id);
        this.setCartValues(cart);
        Storage.saveCart(cart);
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = `
            <i class="fas fa-shopping-cart"></i>
            añadir al carrito
        `
    }
    getSingleButton(id) {
        return buttonsDOM.find(button => button.dataset.id == id)
    }
}

// local storage
class Storage {
    static saveCart(cartArray) {
        localStorage.setItem('cart', JSON.stringify(cartArray))
    }
    static getCart() {
        let lscart = localStorage.getItem('cart');
        return lscart ? JSON.parse(lscart) : [];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();
    // setup app
    ui.setupAPP();
    // get all products
    products.getProducts().then(products => 
        ui.displayProducts(products)).then(() => {
            ui.getBagButtons();
            ui.cartLogic();
        })
})

searchBtn.addEventListener('click', () => {
    search.style.width = '90%';
    search.style.paddingLeft = '40px';
    search.style.cursor = 'text';
    search.focus();

    let i = 0;
    let message = 'Busca un producto...';
    let speed = 100;

    function typeWriter() {
        if (i < message.length) {
            msg = search.getAttribute('placeholder') + message.charAt(i);
            search.setAttribute('placeholder', msg)
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();
})

search.addEventListener('keydown', () => {
    tip.style.visibility = 'visible';
    tip.style.opacity = '1';
})

search.addEventListener('keypress', async (e) => {
    const searchUI = new UI();
    if (e.key === 'Enter') {
        // get product
        let name = search.value;
        Products.getProductByName(name).then(products => 
            searchUI.displayProducts(products)).then(() => {
                searchUI.getBagButtons();
                searchUI.cartLogic();
            })
      }
})