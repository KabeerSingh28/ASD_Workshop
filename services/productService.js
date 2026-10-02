const productDb = require("../database/productDb");

async function getAllProducts() {
    return await productDb.readFileDelay();
}

async function getProductById(id) {
    const products = await productDb.readFileDelay();
    return products.find(item => item.id === id);
}

async function createProduct(product) {
    const products = await productDb.readFileDelay();
    const newProduct = { ...product, id: Date.now() };
    products.push(newProduct);
    await productDb.writeFile(products);
    return newProduct;
}

async function updateProduct(id, productData) {
    const products = await productDb.readFileDelay();
    const index = products.findIndex(item => item.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...productData, id };
        await productDb.writeFile(products);
        return products[index];
    }
    return null;
}

async function deleteProduct(id) {
    const products = await productDb.readFileDelay();
    const index = products.findIndex(item => item.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        await productDb.writeFile(products);
        return true;
    }
    return false;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
