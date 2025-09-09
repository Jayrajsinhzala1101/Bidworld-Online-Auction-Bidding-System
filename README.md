# 🏷️ **BidWorld - Online Auction Platform**

A full-stack auction web application where users can browse products, place bids, and track winning bids. Built with **React 18** frontend, **Redux Toolkit**, and **Tailwind CSS** for responsive UI.

---

## 🚀 **Features**

- **User Authentication**: Secure login and registration
- **Category Browsing**: Explore products by category
- **Product Details**: View description, dimensions, verification status, and auction timer
- **Bidding System**: Place bids with minimum bid validation
- **Winning Bid List**: Track winning bids and payment status
- **Admin Panel**: Edit products and manage auctions
- **3D Product View**: Interactive 3D models using Three.js
- **Responsive Design**: Mobile-friendly layout
- **Animations**: Smooth transitions with Framer Motion
- **Notifications**: Toast notifications for bidding status

---

## 🛠️ **Tech Stack**

### **Frontend**

- **React 18** - User interface
- **Redux Toolkit & React Redux** - State management
- **React Router DOM v6** - Routing
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **Three.js & Drei** - 3D product views
- **React Toastify** - Notifications
- **React Moment** - Date formatting
- **Tailwind CSS** - Styling

### **Backend (Assumed / API)**

- **Node.js & Express** - REST API
- **MongoDB / PostgreSQL** - Database (depending on implementation)
- **JWT Authentication** - Secure login

---

## 📁 **Project Structure**

```
Final Project/
├── backend/
│   ├── controllers/          # Route controllers
│   ├── models/               # Mongoose / DB models
│   ├── routes/               # API routes
│   ├── middleware/           # Auth, error handling, etc.
│   ├── utils/                # Helper functions (email, cloudinary, etc.)
│   ├── .env                  # Environment variables (ignored in git)
│   ├── server.js             # Main Express server
│   └── package.json
├── frontend/
│   ├── public/               # Static assets (favicon, index.html)
│   ├── src/
│   │   ├── components/       # Reusable UI components (cards, tables, modals)
│   │   ├── pages/            # Main application pages (CategoryProducts, ProductDetails, WinningBidList, ProductEdit)
│   │   ├── redux/            # Redux slices & store
│   │   ├── hooks/            # Custom hooks (auth, redirect)
│   │   ├── router/           # Layouts, containers, typography
│   │   ├── styles/           # Tailwind CSS and custom styles
│   │   └── App.jsx           # Main app component
│   ├── package.json
│   ├── tailwind.config.js
│   └── README.md
├── .gitignore
└── README.md
```

---

## 🚀 **Quick Start**

### **Prerequisites**

- Node.js 16+
- npm or yarn
- Backend API running (for full functionality)

### **Setup Frontend**

```bash
# Clone the repository
git clone <your-repo-url>
cd frontend

# Install dependencies
npm install

# Create .env file with API URL
REACT_APP_API_URL=http://localhost:5000/api

# Start development server
npm start
```

> The app will run at http://localhost:3001

### **Build Production**

```bash
npm run build
```

---

## 🌐 **API Endpoints (Example)**

- `GET /products` - Fetch all products
- `GET /products/:id` - Product details
- `POST /bids` - Place a bid
- `GET /winning-bids` - Get user winning bids
- `PUT /products/:id` - Admin product update
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

---

## 🔧 **Configuration**

### **Environment Variables**

- `REACT_APP_API_URL` - Base URL of backend API

### **Tailwind Customization**

Colors, shadows, and themes defined in `tailwind.config.js`:

- primary: #204C41  
- green: #5BBB7B  
- green_100: #EEF8F2  
- gray_100: #6C7278  
- text: #222222  

---

## 🤝 **Contributing**

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/YourFeature`)  
3. Commit your changes (`git commit -m 'Add YourFeature'`)  
4. Push to the branch (`git push origin feature/YourFeature`)  
5. Open a Pull Request  

---

## 📝 **License**

This project is licensed under the MIT License.  

**BidWorld** - Experience bidding like never before! 🏷️💸
