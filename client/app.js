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

// cart
let cart = [];

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
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if (inCart) {
                button.innerText = "agregado";
                button.disabled = true;
            }
            else {
                button.addEventListener('click', (event) => {
                    event.target.innerText = "agregado";
                    event.target.disabled = true;
                    // get product
                    // add product to cart
                    // save cart in localstorage
                    // set cart values
                    // display cart item
                    // show the cart
                })
            }
        })
    }
}

// local storage
class Storage {

}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    // get all products
    products.getProducts().then(products => 
        ui.displayProducts(products)).then(() => {
            ui.getBagButtons();
        })
})