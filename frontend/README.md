# Event Card Frontend

Frontend application for Event Card Management System built with Next.js, React, TypeScript, and Redux.

## Features

- Template selection and browsing
- Card creation with image upload
- Guest management with bulk import
- Public card viewing with guest name tracking
- Responsive design with Tailwind CSS

## Installation

```bash
npm install
```

## Environment Variables

Copy `.env.local.example` to `.env.local` and configure:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Running the app

```bash
# development
npm run dev

# production
npm run build
npm run start
```

The app will be available at `http://localhost:3000`

## Project Structure

- `/app` - Next.js app router pages
- `/components` - Reusable React components
- `/store` - Redux store and slices
- `/services` - API service layer
- `/types` - TypeScript type definitions



