// ------------------------------- constants --------------------------------------
const PRODUCTS_PER_ROW = 4;
const NEXT_PAGE_BUTTON_ID = document.getElementById('nextPageButton');
const DIV_PRODUCTS_CLASS = document.querySelector('.div-products');
const LDS_DUAL_RING_CLASS = document.querySelector('.lds-dual-ring');
// --------------------------------------------------------------------------------

const LoadVisualization = {
    Show() {
        LDS_DUAL_RING_CLASS.classList.remove('hidden')
        LDS_DUAL_RING_CLASS.classList.add('visible')
    },
    
    Hide() {
        LDS_DUAL_RING_CLASS.classList.remove('visible')
        LDS_DUAL_RING_CLASS.classList.add('hidden')
    }
};

const LastRowProducts = {
    updateLastRowProuctsClass() {
        removeClassFromOldLastRow()
        addClassToNewLastRow()
    },
    
    removeClassFromOldLastRow() {
        const productArray = getLastRowProducts()
        productArray.forEach(product => {
            product.classList.remove('last-row-product');
        });
    },
    
    getLastRowProducts() {
        return document.querySelectorAll('.last-row-product')
    },
    
    addClassToNewLastRow() {
        const productArray = getProductsElementsArray()
        const lastRowStartIndex = getLastRowStartIndex(productArray)
        addClassToLastRowProducts(productArray, lastRowStartIndex)
    },
    
    getProductsElementsArray() {
        return productArray = Array.from(document.querySelectorAll('.product'));
    },
    
    getLastRowStartIndex(productArray) {
        let rows = Math.ceil(productArray.length / PRODUCTS_PER_ROW);
        return (rows - 1) * PRODUCTS_PER_ROW;
    },
    
    addClassToLastRowProducts(productArray, lastRowStartIndex) {
        productArray.forEach((product, index) => {
            if(index >= lastRowStartIndex) {
                product.classList.add('last-row-product');
            }
        })
    }
};

const ProductPageManager = {
    URL: 'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1', 
    data: null,

    async updateDivProductsHtml() {
        LoadVisualization.Show();
        const response = await this.tryConnectURL()
        await this.extractDataFromResponse(response)
        this.addNewProducts()
        LoadVisualization.Hide();
    },

    async tryConnectURL() {
        const response = await fetch(this.URL);
        
        if (!response.ok) {
            throw new Error('There was a problem fetching the data: Network response was not ok.');
        }

        return response
    }
    ,

    async extractDataFromResponse(response) {
        this.data = await response.json();
        this.URL = `https://${this.data.nextPage}`;
    },

    addNewProducts() {
        this.data.products.forEach(product => {
            this.productHTMLStructure(product)
        });
    },

    productHTMLStructure(product) {
        DIV_PRODUCTS_CLASS.innerHTML += `
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
    }
};

async function updateDivProductsHtml() {
    try {
        await ProductPageManager.updateDivProductsHtml();
        LastRowProducts.updateLastRowProuctsClass()
    } catch (error) {
        console.error('There was a problem updating the products:', error);
    }
}

updateDivProductsHtml();

NEXT_PAGE_BUTTON_ID.addEventListener('click', async () => {
    updateDivProductsHtml();
});
