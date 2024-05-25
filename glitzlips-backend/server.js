// server.js

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/charge', async (req, res) => {
    const { stripeToken } = req.body;
    const charge = await stripe.charges.create({
        amount: 1999, // Amount in cents
        currency: 'usd',
        description: 'Example charge',
        source: stripeToken,
    });
    res.send('Success');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
