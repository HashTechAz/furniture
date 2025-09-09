# Montana Furniture Website

A modern furniture e-commerce website built with Next.js 15, TypeScript, and CSS Modules.

## Features

### Public Website
- **Home Page**: Hero section, featured products, news, and call-to-action
- **Series Page**: Product series overview (Montana System, Montana Mini, Panton Wire, Montana Free)
- **Products Page**: Product categories and featured products
- **Professionals Page**: Resources for architects and designers
- **About Page**: Company information and values
- **Contact Page**: Contact form and company information

### Admin Panel
- **Authentication**: Secure login with JWT tokens
- **Dashboard**: Overview of products, categories, orders, and revenue
- **Category Management**: Create, edit, and delete product categories
- **Product Management**: Manage product catalog with filtering and search
- **Series Management**: Organize products into series/collections
- **Responsive Design**: Mobile-friendly interface

### Components
- **Header**: Navigation with dropdown menus and locale selector
- **Footer**: Company links, newsletter signup, and social media
- **Carousel**: Image carousel with auto-play and manual controls
- **Modal**: Reusable modal component for various use cases
- **Filter**: Advanced filtering component for product listings

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: CSS Modules (no Tailwind)
- **Authentication**: JWT tokens with bcrypt password hashing
- **Middleware**: Route protection for admin panel

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd furniture
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local file
JWT_SECRET=your-secret-key-here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Access

### Default Admin Credentials
- **Email**: admin@montanafurniture.com
- **Password**: password

### Admin Routes
- `/admin/login` - Admin login page
- `/admin` - Admin dashboard
- `/admin/categories` - Category management
- `/admin/products` - Product management
- `/admin/series` - Series management

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Header/           # Navigation header
│   ├── Footer/           # Site footer
│   ├── Carousel/         # Image carousel
│   ├── Modal/            # Modal component
│   └── Filter/           # Filter component
├── lib/                  # Utility functions
│   └── auth.ts           # Authentication logic
└── middleware.ts         # Route protection middleware
```

## Backend Integration

The frontend is designed to work with a separate backend API at:
`http://furniture.hashtech.az/swagger/index.html`

Currently, the admin panel uses mock data. To integrate with the real backend:

1. Update API endpoints in the admin pages
2. Implement proper data fetching with the backend
3. Add error handling and loading states
4. Update authentication to work with backend JWT

## Customization

### Styling
- All styles use CSS Modules for component isolation
- Global styles are in `src/app/globals.css`
- Responsive design with mobile-first approach
- Consistent color scheme and typography

### Adding New Pages
1. Create a new folder in `src/app/`
2. Add `page.tsx` and `page.module.css`
3. Update navigation in `src/components/Header/Header.tsx`

### Adding New Components
1. Create component folder in `src/components/`
2. Add component files with `.tsx` and `.module.css`
3. Export from component folder

## Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## License

This project is proprietary software for Montana Furniture.