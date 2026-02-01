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


## Screenshots
<img width="1905" height="910" alt="image" src="https://github.com/user-attachments/assets/72fc9e6a-5d8a-40b4-a1cf-875a7a65e561" />
<img width="1900" height="791" alt="image" src="https://github.com/user-attachments/assets/38ede7a8-b1ba-410f-b176-da5fb2e0dce1" />
<img width="1896" height="799" alt="image" src="https://github.com/user-attachments/assets/b4fa4e49-c9e7-4014-96b5-63501741479d" />
<img width="1919" height="800" alt="image" src="https://github.com/user-attachments/assets/45807161-7867-45f9-b03d-cf22e33197cc" />
<img width="1898" height="907" alt="image" src="https://github.com/user-attachments/assets/bfb80530-f803-4c5b-b809-984703acdaec" />
<img width="1919" height="803" alt="image" src="https://github.com/user-attachments/assets/aa3c8190-e1fd-4d5f-8715-5f874aecbeca" />








