// ------------------------------- constants --------------------------------------
const PRODUCTS_PER_ROW = 4;
const NEXT_PAGE_BUTTON_ID = document.getElementById('nextPageButton');
const DIV_PRODUCTS_CLASS = document.querySelector('.div-products');

// ------------------------ div-products last row function ------------------------
function updateLastRowProuctsClass() {
    removeClassFromOldLastRow()
    addClassToNewLastRow()
}

function removeClassFromOldLastRow() {
    const productArray = getLastRowProducts()
    productArray.forEach(product => {
        product.classList.remove('last-row-product');
    });
}

function getLastRowProducts() {
    return document.querySelectorAll('.last-row-product')
}

function addClassToNewLastRow() {
    const productArray = getProductsElementsArray()
    const lastRowStartIndex = getLastRowStartIndex(productArray)
    addClassToLastRowProducts(productArray, lastRowStartIndex)
}


function getProductsElementsArray() {
    return productArray = Array.from(document.querySelectorAll('.product'));
}

function getLastRowStartIndex(productArray) {
    let rows = Math.ceil(productArray.length / PRODUCTS_PER_ROW);
    return (rows - 1) * PRODUCTS_PER_ROW;
}

function addClassToLastRowProducts(productArray, lastRowStartIndex) {
    productArray.forEach((product, index) => {
        if(index >= lastRowStartIndex) {
            product.classList.add('last-row-product');
        }
    });
}

const ProductPageManager = {
    URL: 'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1', 
    data: null,

    async updateDivProductsHtml() {
        try {
            const response = await fetch(this.URL);
            
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            //getcontentfromurl
            this.data = await response.json();

            //extractPageNumber
            this.URL = `https://${this.data.nextPage}`;

            //extractProductsArray
            let productsHTML = '';

            this.data.products.forEach(product => {
                productsHTML += `
                    <div class="product" id="${product.id}">
                        <img src="${product.image}" alt="Foto do Produto">
                        <h4 class="product-title">${product.name}</h4>
                        <p class="product-description">${product.description}</p>                        
                        <p class="old-price">De: R$${product.oldPrice}</p>
                        <p class="new-price">Por: R$${product.price}</p>
                        <p class="product-installments">ou ${product.installments.count}x de R$${product.installments.value}</p>
                        <button class="buy-button">Comprar</button>
                    </div>
                `
            });
            console.log(productsHTML);
            return productsHTML;
        } catch (error) {
            console.error('There was a problem fetching the data:', error);
            throw error;
        }
    },
    
};

NEXT_PAGE_BUTTON_ID.addEventListener('click', async () => {
    try {
        DIV_PRODUCTS_CLASS.innerHTML += await ProductPageManager.updateDivProductsHtml();
        updateLastRowProuctsClass()
    } catch (error) {
        console.error('There was a problem updating the products:', error);
    }
});

