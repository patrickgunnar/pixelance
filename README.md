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

- **Frontend:** React, Next.js, TypeScript, shadcn-ui, Tailwind CSS, lucide-react
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

- **Stripe**: Sign up at Stripe and obtain your secret key and webhook secret. 
- **Resend**: Sign up at Resend and obtain your API key.

### Set up webhooks:

- **Stripe**: Go to your Stripe dashboard and set the webhook URL to https://"your-url"/api/webhooks/stripe

**Ensure these values are correctly set in your .env file.**

    - PAYLOAD_SECRET="" (any secure key)
    - NEXT_PUBLIC_SERVER_URL="" (application URL)

    - MONGODB_URL=""

    - RESEND_API_KEY=""

    - STRPE_SECRET_KEY=""
    - STRIPE_WEBHOOK_SECRET=""

## Database Configuration

1. Ensure your MongoDB database is running.
2. Update the MONGODB_URL in the .env file with your database credentials.

## Updating Next.js Configuration for Remote Image Patterns

To ensure your images are displayed correctly, you need to configure your URL in the Next.js settings. Follow these steps:

1. Open the next.config.mjs file:
    - Locate and open the next.config.mjs file in your project root directory.

2. Update the Remote Patterns:
    - Within the images section, find the remotePatterns array.

Add your hostname (URL) and protocol to the remotePatterns array as shown below:

```sh
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-domain.com',
        port: '',
        pathname: '/path-to-images/**',
      },
    ],
  },
};
```

**Replace your-domain.com with your actual domain and adjust the pathname if necessary.**

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License and Ownership

All rights and intellectual property over Pixelance are exclusively owned by Patrick Gunnar.
