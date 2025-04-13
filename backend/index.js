import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

import AuthRouter from './Routes/AuthRouter.js';
import ProductRouter from './Routes/ProductRouter.js';
import ExpenseRouter from './Routes/ExpenseRouter.js';
import ensureAuthenticated from './Middlewares/Auth.js';
import { connectDB } from './Models/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const _dirname = path.resolve();

app.get('/ping', (req, res) => {
    res.send('PONG');
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// Routes
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/expenses', ensureAuthenticated, ExpenseRouter);

// Serve static files from the React app
app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    connectDB();
});
