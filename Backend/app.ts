// npm i express dotenv ts-node axios csvtojson typescript @types/express @types/node 
import { connectToDatabase } from './utils/db'
import chartRouter from './chart'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const corsOptions = {
  // origin: 'http://localhost:3000',
  origin: process.env.REACT_ENDPOINT,
  optionsSuccessStatus: 200,
}
connectToDatabase() 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions)) 

app.use('/api/v1/chart', chartRouter);

app.get('/health', async (req, res) => {
  res.json({"Status" : "Backend healthy"})
}); 

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} !`);
}); 