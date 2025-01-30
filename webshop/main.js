let carts = document.querySelectorAll('.add-cart');

let products = [ 
    {
        name: "Docent zonder haar",
        tag: "docentzonderhaar",
        price: 15,
        inCart: 0
    },
    {
        name: "Docent met baard",
        tag: "docentmetbaard",
        price: 15,
        inCart: 0
    },
    {
        name: "Docent met haar",
        tag: "docentmethaar",
        price: 15,
        inCart: 0
    },
    {
        name: "Studiepunten",
        tag: "studiepunten",
        price: 100,
        inCart: 0
    },
	    {
        name: "Minnaert gebouw",
        tag: "minnaertgebouw",
        price: 40000,
        inCart: 0
    },
	    {
        name: "Academie gebouw",
        tag: "academiegebouw",
        price: 60000,
        inCart: 0
    },
	{
        name: "Bachelor diploma",
        tag: "bachelordiploma",
        price: 10000,
        inCart: 0
    },
	{
        name: "Docent met lang haar",
        tag: "docentmetlanghaar",
        price: 400,
        inCart: 0
    }
];

for(let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if( productNumbers ) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( action === "decrease" ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product, action);
}

function setItems(product, action) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems) {
        let currentProduct = product.tag;
        if (!cartItems[currentProduct]) {
            cartItems[currentProduct] = product;
        }
        if (action === "decrease" && cartItems[currentProduct].inCart > 1) {
            cartItems[currentProduct].inCart -= 1;
        } else {
            cartItems[currentProduct].inCart += 1;
        }
    } else {
        product.inCart = 1;
        cartItems = { [product.tag]: product };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    displayCart();
}

function totalCost(product, action) {
    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    if (action === "decrease") {
        localStorage.setItem("totalCost", cart - product.price);
    } else {
        localStorage.setItem("totalCost", cart + product.price);
    }
    displayCart();
}

function displayCart() {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    let cart = parseInt(localStorage.getItem("totalCost"));
    let productContainer = document.querySelector('.products');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).forEach(item => {
            productContainer.innerHTML += `
                <div class="product">
                    <span>${item.name}</span>
                </div>
                <div class="price">€${item.price},00</div>
                <div class="quantity">
                    <button class="decrease" data-tag="${item.tag}">-</button>
                    <span>${item.inCart}</span>
                    <button class="increase" data-tag="${item.tag}">+</button>
                </div>
                <div class="total">€${item.inCart * item.price},00</div>
            `;
        });
        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4>Totaal</h4>
                <h4>€${cart},00</h4>
            </div>
        `;

        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', () => {
                let tag = button.dataset.tag;
                cartNumbers(products.find(p => p.tag === tag));
                totalCost(products.find(p => p.tag === tag));
            });
        });

        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', () => {
                let tag = button.dataset.tag;
                cartNumbers(products.find(p => p.tag === tag), "decrease");
                totalCost(products.find(p => p.tag === tag), "decrease");
            });
        });
    }
}

onLoadCartNumbers();
displayCart();
