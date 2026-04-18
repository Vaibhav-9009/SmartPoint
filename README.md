# 🎯 SmartPoint Ecommerce Platform
An interactive, premium-tier Full-Stack E-commerce platform developed specifically as a University Capstone Project. It marries high-performance Java Spring Boot architecture natively with a glassmorphic front-end built intricately via React and TailwindCSS.
### 🌐 Live Deployment
**Frontend (Vercel):** https://ecommerce-smartpoint.vercel.app?_vercel_share=2NWuoKf8sHqPV63ivmq9DJkJA0SdvxAI 
---
## 🚀 Tech Stack
**Frontend:**
- **React.js** (Context APIs, Event Dispatchers, HashRouter)
- **Tailwind CSS** (Glassmorphism, Complex Micro-animations, Mix-blend processing)
- **Lucide React** (Vector Iconography)
**Backend:**
- **Java Spring Boot 3** (REST API Infrastructure)
- **Spring Security & JWT** (Native Auth State Management)
- **Hibernate & JPA** (ORM Mapping)
- **MySQL Database** (Relational Data Matrix)
---
## 🔥 Key Features
- **Offline / Presentation Ready:** Natively equipped with an interceptor that mocks JWT authentication via LocalStorage so you can present the full capabilities seamlessly without needing physical backend database spin-ups!
- **Dynamic Cart & Checkout:** Persistent multi-state shopping carts hooked up to a simulated Secure Checkout portal routing natively via cached pseudo-sessions. 
- **Component Reactive UI:** Engineered strictly with asynchronous `window.dispatchEvent` hooks guaranteeing your Navbar, Wishlist, and Profile Tabs synchronize completely fluidly in real-time without manually reloading.
- **Glassmorphic Banners:** Deeply optimized CSS infinite-carousel marquees featuring dynamic intersection observers and custom hover drop-shadows.
---
## ⚙️ How To Run Locally
### 1) Start the Backend 
Navigate to `ecommerce/backend`. Make sure to update `application.properties` with your MySQL configurations.
```bash
mvnw spring-boot:run
