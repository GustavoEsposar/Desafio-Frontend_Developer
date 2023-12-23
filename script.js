const product = document.querySelectorAll('.product');
const productsPerRow = 4;
var productArray = Array.from(product);
var rows = Math.ceil(productArray.length / productsPerRow);
var lastRowStartIndex = (rows - 1) * productsPerRow;

productArray.forEach((product, index) => {
    if(index >= lastRowStartIndex) {
        product.classList.add('last-row-product');
    }
});