import 'dotenv/config'

import express from 'express'
import swaggerUI from 'swagger-ui-express'
import cors from 'cors'

import { connectDB } from './lib/mongo.js';
import { v1Router } from './router/v1/index.js';
import { ResponseError } from './infra/errors/response-error.js';
import { v2Router } from './router/v2/index.js';
import { openApiDocument } from './lib/zod/docs/index.js';
import { ZodError } from 'zod';

connectDB();

const app = express();

app.use(express.json())
app.use(cors())


app.get('/server-status', (req, res) => {
  return res.sendStatus(200)
})

app.use('/docs', swaggerUI.serve)
app.get('/docs', swaggerUI.setup(openApiDocument, {
  customSiteTitle: 'Docs | Anotações'
}))
app.use('/v1', v1Router)
app.use('/v2', v2Router)

app.use((err, req, res, next) => {
  if(err instanceof ZodError) {
    const errors = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message, 
      expected: issue.expected,
    }));
    return res.status(400).json({
      status: "Validation Error",
      message: errors
    })
  }

  if(!(err instanceof ResponseError)) {
    console.error(err.stack);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    message,
  });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Docs: http://localhost:${PORT}/docs`)
});
