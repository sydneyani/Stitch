// controllers/paymentController.js

const Stripe = require('stripe');


exports.createCheckoutSession = async (req, res) => {
    const { plan, streamer } = req.body;

    try {
        // Define the prices for each plan (replace with actual price IDs)
        const prices = {
            Basic: 'price_1PoyDM2MkSPGDgyJtbu8FxoI',
            Premium: 'price_1PoyEH2MkSPGDgyJv7LEqsuO',
            VIP: 'price_1PoyEq2MkSPGDgyJJwuj4Ej2',
        };

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price: prices[plan],
                quantity: 1,
            }],
            mode: 'subscription',
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            metadata: {
                streamer,
            },
        });

        res.json({ checkoutUrl: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Unable to create checkout session' });
    }
};
