// backend/routes/products.js
// if using dummy data 

import express from 'express';
import productsData from '../data/products.json' with { type: 'json' };

const router = express.Router();

// Middleware to log all product route requests
router.use((req, res, next) => {
    console.log(`Products route: ${req.method} ${req.originalUrl}`);
    next();
});


// Search Endpoint
router.get('/search', (req, res) => {
    const searchTerm = req.query.q ? req.query.q.toLowerCase() : '';

    if (!searchTerm) {
        return res.status(400).json({ message: 'Search query parameter (q) is required.' });
    }

    const filteredProducts = productsData.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );

    if (filteredProducts.length === 0) {
        return res.status(404).json({ message: 'No products found matching your search.' });
    }
    res.json(filteredProducts);
});

// GET products filtered by category
router.get('/filter', (req, res) => {
    console.log('--- Inside /api/products/filter route ---');
    console.log('Backend received raw query params:', req.query);

    const { category, limit } = req.query; 

    let filteredProducts = productsData;

    if (category) {
        const queryCategory = category.toLowerCase(); 
        filteredProducts = productsData.filter(product =>
            product.category.toLowerCase() === queryCategory
        );
    }

    // Apply limit if provided
    if (limit) {
        filteredProducts = filteredProducts.slice(0, parseInt(limit, 10));
    }


    console.log(`Backend: Found ${filteredProducts.length} products for category "${category}" (and limited to ${limit}).`);

    if (filteredProducts.length === 0 && category) { // Only return 404 if a category was specified and no products
        console.log('Backend: No products found for specified category, sending 404.');
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(filteredProducts);
});


// GET a single product by ID
router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10); // Parse ID as integer

    const product = productsData.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
});

// GET all products
router.get('/', (req, res) => {
    res.json(productsData);
});

// POST new product (dummy implementation for JSON data)
router.post('/', (req, res) => {

    const newProduct = {
        id: productsData.length > 0 ? Math.max(...productsData.map(p => p.id)) + 1 : 1,
        ...req.body,
        status: req.body.status || 'available', // Default status
        reviews: req.body.reviews || 0, // Default reviews
        description: req.body.description || '', // Default description
        category: req.body.category || 'misc' // Default category
    };
    productsData.push(newProduct); // Add to in-memory array
    res.status(201).json({ message: 'Product added', product: newProduct });
});

// DELETE a product (dummy implementation for JSON data)
router.delete('/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const initialLength = productsData.length;
    // Filter out the product to be deleted
    const updatedProducts = productsData.filter(p => p.id !== productId);

    if (updatedProducts.length === initialLength) {
        return res.status(404).json({ message: 'Product not found' });
    }
    // Replace the in-memory array with the filtered one
    productsData.splice(0, productsData.length, ...updatedProducts);
    res.json({ message: 'Product deleted' });
});


export default router;

//if using my sql

/*import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// Middleware to log all product route requests
router.use((req, res, next) => {
    console.log(`Products route: ${req.method} ${req.originalUrl}`);
    next();
});

// NEW ORDERING: Place specific routes like '/search' and '/filter' BEFORE '/:id'

// NEW: Search Endpoint (e.g., /api/products/search?q=keyword)
router.get('/search', (req, res) => {
    const searchTerm = req.query.q; // Get the search term from the 'q' query parameter

    if (!searchTerm) {
        return res.status(400).json({ message: 'Search query parameter (q) is required.' });
    }

    const sanitizedSearchTerm = `%${db.escape(searchTerm).slice(1, -1)}%`;

    const sql = `
        SELECT * FROM products
        WHERE name LIKE ? OR description LIKE ? OR category LIKE ?
    `;

    db.query(sql, [sanitizedSearchTerm, sanitizedSearchTerm, sanitizedSearchTerm], (err, results) => {
        if (err) {
            console.error('Error during search:', err);
            return res.status(500).json({ error: 'Failed to perform search' });
        }
        res.json(results);
    });
});

// GET products filtered by category
// Note: This endpoint expects a query parameter like /filter?category=Necklaces
router.get('/filter', (req, res) => {
    console.log('--- Inside /api/products/filter route ---');
    console.log('Backend received raw query params:', req.query);

    const { category } = req.query;

    if (!category) {
        console.log('Backend: No category provided in query.');
        return res.status(400).json({ message: 'Category parameter is required' });
    }

    const queryCategory = category;

    console.log('Backend preparing to query for category:', queryCategory);

    db.query('SELECT * FROM products WHERE category = ?', [queryCategory],
        (err, results) => {
            if (err) {
                console.error('Backend: Database error during query:', err);
                return res.status(500).json({ error: err.message });
            }
            console.log(`Backend: Found ${results.length} products for category "${queryCategory}".`);

            if (results.length === 0) {
                console.log('Backend: No products found, sending 404.');
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(results);
        }
    );
});


// GET a single product by ID (This must come AFTER /search and /filter)
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error fetching single product:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(results[0]);
    });
});

// GET all products (this route remains unchanged, fetches everything)
// It's good to keep this at the top or near the top if it's your default for /api/products
router.get('/', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            console.error('Error fetching all products:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


// POST new product (This route remains unchanged)
router.post('/', (req, res) => {
    const { name, price, imageUrl, status, altImage, reviews, description, category } = req.body;
    const query = 'INSERT INTO products (name, price, imageUrl, status, altImage, reviews, description, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, price, imageUrl, status, altImage, reviews, description, category], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Product added', productId: result.insertId });
    });
});

// DELETE a product (This route remains unchanged)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM products WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Product deleted' });
    });
});


export default router;*/
