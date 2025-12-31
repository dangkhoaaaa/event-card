# Event Card Backend API

Backend API for Event Card Management System built with NestJS, MongoDB, and Cloudinary.

## Features

- Template management for different card types (wedding, birthday, anniversary, etc.)
- Card creation and management
- Bulk guest invitation system
- Image upload to Cloudinary
- Guest viewing and response tracking

## Installation

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your configuration:

```env
MONGODB_URI=mongodb://localhost:27017/eventcard
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=3001
FRONTEND_URL=http://localhost:3000
```

## Running the app

```bash
# development
npm run start:dev

# production
npm run build
npm run start:prod
```

## API Endpoints

### Templates
- `GET /templates` - Get all templates (optional ?type=wedding filter)
- `GET /templates/:id` - Get template by ID
- `POST /templates` - Create new template

### Cards
- `GET /cards` - Get all cards (optional ?hostName filter)
- `GET /cards/:id` - Get card by ID
- `GET /cards/slug/:slug` - Get card by slug (increments view count)
- `POST /cards` - Create new card
- `PATCH /cards/:id` - Update card
- `DELETE /cards/:id` - Delete card

### Guests
- `GET /guests?cardId=xxx` - Get all guests for a card
- `GET /guests/:id` - Get guest by ID
- `GET /guests/view/:cardId/:name` - Mark guest as viewed
- `GET /guests/statistics/:cardId` - Get guest statistics
- `POST /guests` - Create single guest
- `POST /guests/bulk` - Create multiple guests
- `PATCH /guests/:id` - Update guest
- `DELETE /guests/:id` - Delete guest



