# WenBuy

**WenBuy ("When to buy?")** is a simple React + TypeScript application designed for beginner investors who want to better understand when an ETF may become more attractive to buy.

The app helps users monitor ETF prices and see how far the current price is from recent highs, providing a simple overview of possible buying opportunities.

🔗 **[Live Demo](https://wenbuy-beta.vercel.app/)**

## Features

- ETF price monitoring
- Price comparison with 52-week highs
- Buy Score and buy signal
- Portfolio weight tracking
- ETF search and selection
- Responsive user interface
- Market data integration

## Technologies

### Frontend

- React
- TypeScript
- Vite
- Axios
- CSS

### Backend

- Node.js
- Express
- Yahoo Finance
- CORS

## Preview

![WenBuy dashboard](./screenshot/dashboard.png)

## Installation

### 1. Clone the repository

~~~bash
git clone https://github.com/zieDoo/wenbuy.git
cd wenbuy
~~~

### 2. Install frontend dependencies

~~~bash
npm install
~~~

### 3. Start the frontend

~~~bash
npm run dev
~~~

### 4. Install backend dependencies

Open a new terminal and navigate to the server folder:

~~~bash
cd server
npm install
~~~

### 5. Start the backend

~~~bash
node index.js
~~~

The backend runs on:

~~~text
http://localhost:3001
~~~

## About

WenBuy was created as a personal frontend project to practice building modern web applications with React and TypeScript.

## Future Improvements

- More ETF indicators
- Historical price charts
- Additional market data sources
- User accounts and portfolio persistence
