const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5001
const mongoose = require('mongoose');
const router = require('./authRouter');
const os = require('os');

const app =express()

app.get('/favicon.ico', (req, res) => res.status(204));
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: '*'
}
));
app.use('/auth' ,router)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://admin:admin@clus.qrigh.mongodb.net/?retryWrites=true&w=majority&appName=Clus`)

        const networkInterfaces = os.networkInterfaces();
        let ipAddress = '';
        
        for (const iface in networkInterfaces) {
            for (const alias of networkInterfaces[iface]) {
                if (alias.family === 'IPv4' && !alias.internal) {
                    ipAddress = alias.address;
                    break;
                }
            }
            if (ipAddress) break; // Найден внешний IP-адрес
        }

        console.log(`Server is running at http://${ipAddress}:${PORT}`);

        
        app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`));
    }catch(e){
        console.log(e)
    }
}

start()
