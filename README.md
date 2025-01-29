# URL Shortener Frontend

A modern React frontend application for URL shortening with advanced features for managing and searching shortened URLs.

## Features

- **URL Shortening**
  - Create short URLs from long ones
  - Copy short codes or full redirect URLs
  - View original and shortened URLs
  - Real-time validation

- **URL Management**
  - Edit existing shortened URLs
  - Delete shortened URLs
  - View URL statistics (access count, creation date)
  - Local storage persistence

- **Search Capabilities**
  - Search through your shortened URLs
  - Find any existing short URL in the system
  - Real-time search results
  - Search by short code or original URL

- **User Interface**
  - Modern, responsive design
  - Copy-to-clipboard functionality
  - Visual feedback for actions
  - Loading states and error handling
  - Reset functionality to clear all data

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Lucide React (for icons)
- Vite (build tool)

## API Integration

The frontend integrates with the following API endpoints:

- `POST /shorten` - Create a new shortened URL
- `GET /shorten/{shortUrl}` - Get URL details and search
- `GET /shorten/{shortUrl}/stats` - Get URL statistics
- `PUT /shorten/{shortUrl}` - Update a URL
- `DELETE /shorten/{shortUrl}` - Delete a URL

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`

## Environment Setup

The application expects a backend API running on `http://localhost:8080`. The base URL for redirects is configured as `http://localhost:8080/redirect/`.

## Project Structure

- `src/types.ts` - TypeScript interfaces for API requests and responses
- `src/api.ts` - API integration functions
- `src/App.tsx` - Main application component
- `src/index.css` - Global styles and Tailwind CSS imports

## Usage

1. **Shortening URLs**
   - Enter a URL in the input field
   - Click "Shorten URL"
   - Copy either the short code or full redirect URL

2. **Managing URLs**
   - View all your shortened URLs
   - Edit URLs using the edit button
   - Delete URLs using the delete button
   - View statistics using the stats button

3. **Searching URLs**
   - Use the search bar to find URLs
   - Search works with both short codes and original URLs
   - View details of any existing short URL in the system

4. **Resetting Data**
   - Click the "Reset All" button to clear all stored URLs
   - Confirmation will be required before deletion

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request# Frontend-de-Acortador-de-URLs
