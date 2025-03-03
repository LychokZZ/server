const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5001
const mongoose = require('mongoose');
const router = require('./authRouter');
const app = express();

const allowedOrigins = ["http://localhost:3000", "https://lychokzz.github.io"];
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

app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth' ,router)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://admin:admin@clus.qrigh.mongodb.net/?retryWrites=true&w=majority&appName=Clus`)
        app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`));
    }catch(e){
        console.log(e)
    }
}

start()
