import express from "express";
const app = express();

app.get('/api/products', (req, res) => {
    const products = [
        {
            id: 1,
            name: 'wood',
            price: 200,
            image: 'https://picsum.photos/200/300'
        },
        { 
            id: 2,
            name: 'plate',
            price: 300,
            image: 'https://picsum.photos/200/300'
        },
        {
            id: 3,
            name: 'fruits',
            price: 500,
            image: 'https://picsum.photos/200/300'
        },
        { 
            id: 4,
            name: 'siyaram_saree',
            price: 700,
            image: 'https://picsum.photos/200/300'
        },
    ];

    // Check if a search query is present
    if (req.query.search) {
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(req.query.search.toLowerCase())
        );
        res.send(filteredProducts);
        return;
    }

    // Simulate a delay and return the full list of products
    setTimeout(() => {
        res.json(products);
    }, 3000);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
