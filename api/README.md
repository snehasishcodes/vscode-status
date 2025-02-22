# Node.js - Express.js REST API with Typescript

## Load Template with [`template-use`](https://github.com/template-use/template-use)
```bash
npx template-use express-ts-mongoose
```

## Installation
```bash
npm install
```

OR

```bash
npm install express body-parser cookie-parser cors morgan
npm install --save-dev typescript ts-node nodemon @types/express @types/node @types/morgan @types/cors @types/cookie-parser
```

## Usage
- Create a `.env` file and add your MongoDB Connection String
```
MONGODB_URI="YOUR_MONGODB_STRING"
```

- Files
    - `/src/database/connection.ts` - the main connection code for MongoDB 
    - `/src/database/models/` - will contain all your Mongoose Schemas and Models

Reminder: Make sure to include `.env` in the `.gitignore` file before pushing to prod.

---

## Usage with Vercel
- Install `@vercel/node`
```bash
npm install @vercel/node
```

- Add `vercel.json`
```json
{
    "version": 2,
    "builds": [
        {
        "src": "src/index.ts",
        "use": "@vercel/node"
        }
    ],
    "routes": [
        {
        "src": "/(.*)",
        "dest": "/src/index.ts"
        }
    ]
}
```

- Update `scripts` of `package.json`
```json
{
    "scripts": {
        "dev": "ts-node src/index.ts",
        "build": "tsc",
        "start": "node dist/index.js"
    }
}
```

- Vercel Deployment Configuration
    - Root directory: Leave it empty (or set it to `/`).
    - Build command: `npm run build`
    - Output directory: `dist` (if applicable, but Vercel auto-detects it)
    - Install command: `npm install`
    - Click "Deploy".