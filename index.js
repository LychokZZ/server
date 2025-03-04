const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./authRouter');

const app = express();
const PORT = process.env.PORT || 5001;

const allowedOrigins = ["http://localhost:3000", "https://lychokzz.github.io"];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
};


app.use(cors(corsOptions));

// Обробляємо preflight-запити (OPTIONS)
app.options('*', cors(corsOptions));

app.use(express.json());

// Глобальні CORS-заголовки
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use('/auth', router);

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://admin:admin@clus.qrigh.mongodb.net/?retryWrites=true&w=majority&appName=Clus`);
        app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();

