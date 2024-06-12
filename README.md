# Pixelance: Your Marketplace for Exceptional Assets!

Pixelance is a comprehensive marketplace for digital assets such as icons, images, and more. Built using cutting-edge technologies, Pixelance ensures seamless integration and performance for both buyers and sellers of digital assets.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Database Configuration](#database-configuration)
- [Install Dependencies](#install-dependencies)
- [Run Pixelance](#run-pixelance)
- [License and Ownership](#license-and-ownership)

## Features

- Comprehensive digital asset marketplace
- Secure payments via Stripe
- Responsive design with Tailwind CSS
- Real-time communication and notifications
- User authentication and management
- Seamless integration with MongoDB for data storage

## Technologies Used

- **Frontend:** React, Next.js, TypeScript, Tailwind CSS, lucide-react
- **State Management:** Zustand
- **Backend:** Express.js, tRPC server and client, Payload CMS
- **Database:** MongoDB
- **Authentication and Notifications:** Resend, Nodemailer
- **Payments:** Stripe
- **Utilities:** Body-parser, dotenv, cross-env, nodemon, swiper, zod, postcss

## Setup Instructions

To set up and run this project locally, follow these steps:

1. **Clone the repository:**
```sh
git clone https://github.com/patrickgunnar/pixelance.git
cd pixelance
```

## Environment Variables

Fill in the required keys and secrets in the .env file or rename .env_example to .env.

### Obtaining Keys and Secrets

To run this application, you must have accounts on the following platforms and obtain the necessary keys and secrets:

    - **Payload CMS**: Sign up at Payload CMS and obtain your secret key.
    - **Stripe**: Sign up at Stripe and obtain your secret key and webhook secret.
    - **Resend**: Sign up at Resend and obtain your API key.

**Ensure these values are correctly set in your .env file.**

    - PAYLOAD_SECRET=""
    - NEXT_PUBLIC_SERVER_URL=""
    - MONGODB_URL=""
    - RESEND_API_KEY=""
    - STRIPE_SECRET_KEY=""
    - STRIPE_WEBHOOK_SECRET=""

## Database Configuration

    1. Ensure your MongoDB database is running.
    2. Update the MONGODB_URL in the .env file with your database credentials.

## Install dependencies
```bash
npm install
```

## Run Pixelance

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## License and Ownership

All rights and intellectual property over Caladria are exclusively owned by Patrick Gunnar.
