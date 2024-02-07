import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { PrismaClient } from './prisma/generated/client/index.js'
const prisma = new PrismaClient()

import questionRoute from './router/questionRoute.js'


// Reading json file available in data/data.json. All questions are there. Using this data.
import { readFile } from 'fs/promises'; 
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataPath = join(__dirname, 'data', 'data.json');
const data = await readFile(dataPath, 'utf-8');
const questionData = JSON.parse(data);

// setting up express server
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({
  parameterLimit: 100000,
  limit: '50mb'
}))
app.use(morgan());
app.disable('etag')

//// setting up cors. Only allowed origin can make api request
const allowedOrigins = ['https://api-testing-63q1.onrender.com'];
const corsOptions = {
    credentials: true,
    origin: allowedOrigins,
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization, Cookie'
};

app.use(cors(corsOptions));

// Function to populate MongoDB with seed data of all questions
const addMockData = async () => {
  try {
    
    const questions = await prisma.question.findMany();
    if(questions.length === 0){
    // Removing existing data from the collection
      await prisma.question.deleteMany();
  
      // Inserting mock data of questions into the collection
      await prisma.question.createMany({
        data: questionData
      })
      console.log('mock data added to MongoDB');
    }
  } catch (error) {
    console.error('Error populating database:', error);   
  }
};

//routes
app.use('/v1/question', questionRoute);

const port = process.env.PORT || 8000;
await addMockData();

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
