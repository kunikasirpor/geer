// backend/routes/products.js

import express from 'express';
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
    const { name, price, imageUrl, status, altImage, reviews, description, additionalImages, category } = req.body;
    const query = 'INSERT INTO products (name, price, imageUrl, status, altImage, reviews, description, additionalImages, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, price, imageUrl, status, altImage, reviews, description, JSON.stringify(additionalImages), category], (err, result) => {
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


export default router;