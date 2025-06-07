require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const folderRoutes = require('./routes/folderRoutes');
const noteRoutes = require('./routes/noteRouter')
const userRoutes = require('./routes/userRoutes')

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.options("*", cors());

app.use(cors({
    origin: [process.env.FRONTEND_URL],
     credentials: true,
}));
app.use(express.json());

app.use('/api/folders', folderRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/auth', userRoutes);

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
.then(()=>{
    app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))
    console.log('MongoDB Connected');
})
.catch((err)=>{
    console.error(err);
});