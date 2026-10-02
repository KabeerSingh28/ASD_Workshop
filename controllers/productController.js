const productService = require("../services/productService");

async function getProducts(req, res) {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (err) {
        res.status(500).send("Server Error");
    }
}

async function getProductById(req, res) {
    try {
        const id = Number(req.params.id);
        const product = await productService.getProductById(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send("Not Found");
        }
    } catch (err) {
        res.status(500).send("Server Error");
    }
}

async function createProduct(req, res) {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).send("Server Error");
    }
}

async function updateProduct(req, res) {
    try {
        const id = Number(req.params.id);
        const product = await productService.updateProduct(id, req.body);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send("Not Found");
        }
    } catch (err) {
        res.status(500).send("Server Error");
    }
}

async function deleteProduct(req, res) {
    try {
        const id = Number(req.params.id);
        const success = await productService.deleteProduct(id);
        if (success) {
            res.json({ success: true });
        } else {
            res.status(404).send("Not Found");
        }
    } catch (err) {
        res.status(500).send("Server Error");
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
