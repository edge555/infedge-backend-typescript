require('dotenv').config();
import express from "express";
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
const db = require("./database/dbconfig");
db();
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
