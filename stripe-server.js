// Servidor Node.js para manejar pagos de Stripe
// Instalar dependencias: npm install express stripe cors dotenv

require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Precios de los planes (crear estos en tu dashboard de Stripe)
const PLAN_PRICES = {
  basic: process.env.STRIPE_PRICE_BASIC || 'price_basic_monthly',
  premium: process.env.STRIPE_PRICE_PREMIUM || 'price_premium_monthly',
  family: process.env.STRIPE_PRICE_FAMILY || 'price_family_monthly'
};

// Crear sesión de checkout
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { planType, planName, userEmail, userId } = req.body;

    if (!PLAN_PRICES[planType]) {
      return res.status(400).json({ error: 'Plan inválido' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: PLAN_PRICES[planType],
          quantity: 1,
        },
      ],
      customer_email: userEmail,
      client_reference_id: userId,
      metadata: {
        plan_type: planType,
        plan_name: planName,
        user_id: userId
      },
      success_url: `${process.env.CLIENT_URL}/subscription.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/subscription.html`,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creando sesión:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook para eventos de Stripe
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Error verificando webhook:', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Manejar eventos
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Pago completado:', session.id);
      // Aquí puedes actualizar Firebase directamente si lo prefieres
      break;

    case 'customer.subscription.updated':
      const subscription = event.data.object;
      console.log('Suscripción actualizada:', subscription.id);
      break;

    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object;
      console.log('Suscripción cancelada:', deletedSubscription.id);
      break;

    default:
      console.log(`Evento no manejado: ${event.type}`);
  }

  res.json({ received: true });
});

// Verificar estado de sesión
app.get('/check-session/:sessionId', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    res.json({
      status: session.payment_status,
      customer_email: session.customer_email,
      metadata: session.metadata
    });
  } catch (error) {
    console.error('Error verificando sesión:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Stripe corriendo en puerto ${PORT}`);
});
