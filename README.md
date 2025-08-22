This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Environment Setup

Before running the application, you need to set up the following environment variables:

1. Create a `.env.local` file in the root directory
2. Add your Gemini API key:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

You can get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Troubleshooting

### Gemini API Errors

If you encounter "400 Bad Request" errors from the Gemini API:

1. **Check your API key**: Ensure your `GEMINI_API_KEY` is correctly set in `.env.local`
2. **Test the connection**: Visit `/api/test-gemini` to test your API key
3. **Check API quotas**: Ensure you haven't exceeded your Gemini API usage limits
4. **Content length**: The API has limits on input content length. If you're still getting errors, try reducing the chapter content length in `inngest/functions.js`

### Common Issues

- **"GEMINI_API_KEY environment variable is not set"**: Create a `.env.local` file with your API key
- **"400 Bad Request"**: Usually indicates an invalid API key or malformed request
- **"429 Too Many Requests"**: You've exceeded your API rate limits
