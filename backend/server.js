const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const folderRoutes = require('./routes/folderRoutes');
const noteRoutes = require('./routes/noteRouter')
const userRoutes = require('./routes/userRoutes')
require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());

app.use('/api/folders', folderRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/auth', userRoutes)

const PORT = 4000

mongoose.connect('mongodb://localhost:27017/NoteBook')
.then(()=>{
    app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))
    console.log('MongoDB Connected');
})
.catch((err)=>{
    console.error(err);
});