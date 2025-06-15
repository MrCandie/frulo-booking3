# 📅 Booking App

A simple React Native app to create and manage service bookings (like Haircut, Makeup) with **role-based login** for **Customers** and **Vendors**. Built with Firebase authentication and optional WhatsApp messaging integration.

---

## ✨ Features

### 🔐 Authentication

- Firebase Email/Password Authentication
- Role-based login (Customer or Vendor)

---

### 👥 Customer Features

- ✅ Sign up / Login
- 📋 Select a service (Haircut, Makeup, etc.)
- 🗓 Choose a date and time
- 💰 View service price
- 💳 Make payments (simulated)
- 📬 Receive booking confirmation (simulated WhatsApp message)

---

### 🛠 Vendor Features

- ✅ Sign up / Login
- 📥 View all incoming booking requests
- ✅ Approve or ❌ Reject bookings
- 🔗 Share booking links with customers
- 💬 Send booking info via WhatsApp (via Twilio or simulated)

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js ≥ 14.x
- `npm` or `yarn`
- React Native development environment:
  - Option 1: [Expo](https://docs.expo.dev/get-started/installation/)
  - Option 2: React Native CLI (with Android Studio/Xcode)

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/MrCandie/frulo-booking3
cd booking-app
```

### 2. Install Dependencies

```bash
npx expo install react-native-screens react-native-safe-area-context
```

### 3. Run with Expo

```bash
npx expo start
```
