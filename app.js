import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';
import {MONGODB_CONNECTION,MAIL_ENCRYPTION,MAX_JSON_SIZE,EMAIL_USER,PORT,EMAIL_PORT,EMAIL_PASSWORD,EMAIL_HOST,URL_ENCODED,REQUEST_LIMIT_TIME,REQUEST_LIMIT_NUMBER,JWT_SECRET,JWT_EXPIRATION_TIME,WEB_CACHE} from "./app/config/config.js";
import router from './routes/api.js';



const app = express();

app.use(cors());
app.use(express.json({limit:MAX_JSON_SIZE}));
app.use(express.urlencoded({ extended: URL_ENCODED }));
app.use(helmet());

const limiter = rateLimit({windowMs: REQUEST_LIMIT_TIME, max: REQUEST_LIMIT_NUMBER})
app.use(limiter)

app.set('etag', WEB_CACHE)

mongoose.connect(MONGODB_CONNECTION, {autoIndex: true}).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log('MongoDB disconnected');
})


app.use("/api", router)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})



