
const PRODUCTS_PER_ROW = 4;

function updateLastRowProuctsClass() {
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

updateLastRowProuctsClass()