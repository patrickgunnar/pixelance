import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRPE_SECRET_KEY ?? "", {
    apiVersion: "2024-04-10",
    typescript: true,
});
