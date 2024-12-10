require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./lib/mongo');

const sheetRoutes = require('./routes/sheets');
const annotationsRoutes = require('./routes/annotations');

connectDB();

const app = express();

app.use(express.json())
app.use(cors())

app.use('/sheets', sheetRoutes);
app.use('/annotations', annotationsRoutes);
app.get('/server-status', (req, res) => {
  return res.send(200)
})

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
