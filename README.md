This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Follow these steps to configure the app and start testing

## Setting the project

1. First you got to have the [backend app](https://github.com/chrisarevalo11/img-classification-keras) running. Follow the `README.md`
   instructions to set up the project.

2. Once the backend is running, create a `.env.local` file and add an environment variables (see .env.example to verify the name) with the value
   `'http://localhost:8000'`. This one is the url of the backend app where we'll do requests.

3. Install the required dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result and start testing the app.
