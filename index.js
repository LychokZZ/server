const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5001;
const router = require('./authRouter');


// Список дозволених доменів для CORS
const allowedOrigins = [
  "http://localhost:3000", // локальний розробник
  "https://lychokzz.github.io", // інший домен
  "https://server-eight-lac-10.vercel.app", // перший домен
  "https://server-lychokzzs-projects.vercel.app" // другий домен
];

// Налаштування CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

// Використовуємо CORS
app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth' ,router)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});


// Підключення до MongoDB (якщо потрібно)
const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:admin@clus.qrigh.mongodb.net/?retryWrites=true&w=majority&appName=Clus');
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log('Error while connecting to the database: ', e);
  }
};

start();

// Експортуємо app для використання в Vercel
module.exports = app;
