# ⚙️ Crypto Tracker Backend

This is the **Node.js + Express backend** for the Crypto Tracker full-stack project. It fetches real-time cryptocurrency data from the CoinGecko API, exposes it via REST APIs, stores historical price data in MongoDB, and schedules hourly background jobs to log price history.

---

## 🧠 Tech Stack

- Node.js
- Express.js
- MongoDB (via Mongoose)
- Axios
- node-cron
- dotenv
- CoinGecko API

---

## 🛠 API Endpoints

### ✅ GET `/api/coins`
- Fetches top 10 cryptocurrencies from CoinGecko
- Saves latest data to the `coin` collection (replaces old)
- Returns the latest data to the frontend

### ✅ POST `/api/history`
- Takes the current coin data and appends it to `coin_history` collection

### ✅ GET `/api/history/:coinId`
- Returns all historical data of a specific coin by its `coinId` (optional chart feature)

---

## 📁 Folder Structure

