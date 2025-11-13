# 🚗 Rent To Ride – Car Rental Platform

Rent To Ride is a **MERN stack** car rental application that connects users with local car owners or rental providers.  
It allows users to **browse, book, and manage cars** seamlessly while enabling providers to **list, update, and manage** their vehicles efficiently.  
Built with a clean UI, secure authentication, and smooth data handling — this project demonstrates a full-stack implementation of a real-world rental platform.

---

## 🌐 Live Site URL

🔗 [https://renttoride.netlify.app](https://renttoride.netlify.app)

📡 Backend API: [https://server-rent-to-go.vercel.app](https://server-rent-to-go.vercel.app)

---

## 🧩 Key Features

- 🔐 **Authentication System**

  - Users can register, log in, and sign in with Google.
  - Private routes ensure only logged-in users can add cars, view bookings, and manage listings.

- 🚙 **Dynamic Car Listings**

  - Providers can add, edit, and delete their car listings.
  - Cars include detailed info like category, rent price, location, and availability status.

- 📅 **Car Booking System**

  - Users can view details and book cars directly.
  - Automatically updates car status as “Available” or “Unavailable” in real-time.

- 🏠 **Interactive Home Page**

  - Hero slider, featured cars, “Why Rent With Us” section, and extra sections like top-rated cars and testimonials.
  - All content uses real data (no Lorem Ipsum).

- 🎨 **User Experience Focused**
  - Responsive layout for all devices.
  - Toast/SweetAlert used for success/error messages instead of browser alerts.
  - Beautiful Navbar, Footer, and meaningful content for a professional look.

---

## 🚀 Main Functionalities

| Feature              | Description                                                        |
| -------------------- | ------------------------------------------------------------------ |
| 🏡 Home Page         | Hero banner, featured cars, “Why Rent With Us”, and extra sections |
| 🚗 Add Car           | Private form for providers to list cars                            |
| 📋 My Listings       | Manage cars added by the logged-in provider                        |
| 🧾 My Bookings       | View and manage booked cars                                        |
| 🔍 Browse Cars       | View all available cars publicly                                   |
| 💬 View Details      | View complete car information (Private)                            |
| 🛒 Book Car          | Authenticated users can book cars                                  |
| ✏️ Update/Delete     | Providers can edit or remove their listings                        |
| ⚙️ Real-Time Updates | Booking instantly updates car status                               |

## 🛠️ Tech Stack

### Frontend

- React.js (Vite)
- React Router
- Tailwind CSS
- React Hot Toast / SweetAlert2

### Backend

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose

### Authentication

- Firebase Authentication (Email & Google Login)

### Deployment

- Client: **Netlify**
- Server: **Vercel**

---
