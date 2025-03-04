const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./authRouter');

const app = express();
const PORT = process.env.PORT || 5001;

// Дозволені домени
const allowedOrigins = ["http://localhost:3000", "https://lychokzz.github.io"];

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

// Використання CORS
app.use(cors(corsOptions));

// Глобальні заголовки для всіх запитів
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200); // Важливо для preflight-запитів
    }

    next();
});

// Використання роутера
app.use('/auth', router);

// Запуск сервера
const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://admin:admin@clus.qrigh.mongodb.net/?retryWrites=true&w=majority&appName=Clus`);
        app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();

// Експортуємо сервер для Vercel
module.exports = app;
