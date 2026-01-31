# Shilpkart – Artisan Marketplace
Shilpkart is a full-stack e-commerce platform designed to bridge the gap between traditional local artisans and modern consumers. Developed during my internship at Infotact Solutions, the project focuses on providing a digital storefront for handmade crafts with a heavy emphasis on high performance and secure role-based management.

## Key Features

### 1. Multi-Role Ecosystem
Specialized dashboards for:

- Artisans : Manage product listings, track stock levels, and view sales insights.
- Customers : Discover products, manage wishlists, and track orders.
- Admins : Oversee user verification and product moderation.

### 2. Optimized Media Management
Integrated Cloudinary for cloud-based image hosting and delivery.

- Auto-format selection : Delivers WebP/AVIF images based on browser support.
- On-the-fly Resizing : Dynamically generates thumbnails and gallery views to save bandwidth.
- Lazy Loading : Achieved significantly faster First Contentful Paint (FCP) by fetching optimized assets only when needed.

### 3. Smart Search & Discovery
Implemented server-side pagination and optimized MongoDB queries to ensure fast product discovery across thousands of unique artisanal items.

### 4. Secure Authentication
Integrated JWT (JSON Web Tokens) for session management and Bcrypt for password hashing.

### 5. Modern UI/UX
Built a responsive, high-fidelity interface using Tailwind CSS, focusing on high-quality image rendering with lazy loading to maintain speed.

### 6. Order Management
A complete lifecycle from "Add to Cart" to "Order Success" with state-driven updates.

## Tech Stack
- Frontend
  React.js, Tailwind CSS, Framer Motion (for smooth transitions)
- Backend
  Node.js, Express.js
- Database
  MongoDB (using Mongoose for schema modeling)
- Security
  JWT, Passport.js (for social login integration)

## Installation & Local Development
### 1. Clone the repository
```bash
    git clone https://github.com/your-username/shilpkart.git
```
### 2. Install dependencies
```bash
    cd backend
    npm install
```
```bash
    cd my-project
    npm install
```
### 3. Set up Environment Variables
Create a .env file in the root directory:
```bash
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_URL=your_image_hosting_url
```
### 4. Launch the application
```bash
    npm run dev
```

## Live Link
The website is live at <ins>https://shilpkart-ten.vercel.app/</ins>
