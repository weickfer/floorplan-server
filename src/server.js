import 'dotenv/config'

import express from 'express'
import cors from 'cors'

import { connectDB } from './lib/mongo.js';
import { documentsRouter } from './router/documents.js';
import { annotationsRouter } from './router/annotations.js';

connectDB();

const app = express();

app.use(express.json())
app.use(cors())


app.get('/server-status', (req, res) => {
  return res.send(200)
})
app.use('/documents', documentsRouter)
app.use('/annotations', annotationsRouter)

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
