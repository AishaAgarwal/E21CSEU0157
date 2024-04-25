const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const commonAPI = "https://20.244.56.144/test";
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE0MDQ4NzA1LCJpYXQiOjE3MTQwNDg0MDUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjQxZjU1MDg5LWYzMGQtNDNhNC04MWExLTQwMWM3ZGNhMDQ0MSIsInN1YiI6IkUyMUNTRVUwMTU3QGJlbm5ldHQuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiQmVubmV0dCBVbml2ZXJzaXR5IiwiY2xpZW50SUQiOiI0MWY1NTA4OS1mMzBkLTQzYTQtODFhMS00MDFjN2RjYTA0NDEiLCJjbGllbnRTZWNyZXQiOiJycVNGeVVScVVzTkpydEJMIiwib3duZXJOYW1lIjoiQWlzaGEgQWdhcndhbCIsIm93bmVyRW1haWwiOiJFMjFDU0VVMDE1N0BiZW5uZXR0LmVkdS5pbiIsInJvbGxObyI6IkUyMUNTRVUwMTU3In0.JYkwM2e-9n2ioizfegJO3gS4H_ST0nAbrCwCchK3ZqY"

app.get('/companies/:company/categories/:categoryname/products', async (req, res) => {
    const company = req.params.company;
    const category = req.params.categoryname;
    const n = req.query.n || 10;

    try {
        const response = await axios.get(`${commonAPI}/companies/${company}/categories/${category}/products`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const products = response.data.products;
        products.sort((a, b) => a.price - b.price);
        const topNProducts = products.slice(0, n);

        res.json({ company: company, category: category, topNProducts: topNProducts });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
