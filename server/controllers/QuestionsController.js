import { PrismaClient } from '../prisma/generated/client/index.js';
const prisma = new PrismaClient();

// Get all questions
const getAllQuestions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const itemsPerPage = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified

    const offset = (page - 1) * itemsPerPage;

    //total number of pages
    const totalQuestions = await prisma.question.count();
    const totalPages = Math.ceil(totalQuestions / itemsPerPage);
    
    const questions = await prisma.question.findMany({
      take: itemsPerPage,
      skip: offset,
    });

    return res.status(200).json({ status: true, data: questions,  totalPages});

  } catch (error) {
    return res.status(500).json({ error: "Internal server error", details: error });
  }
};

// Get a single question by ID
const getQuestionById = async (req, res) => {
  const  id = req.params.id;
  try {
    const question = await prisma.question.findUnique({
      where: { id: id },
    });

    if (!question) {
      return res.status(404).json({ status:false, error: 'Question not found' });
    }
    else{
      return res.status(200).json({status:true, data:question});
    }

  } catch (error) {
    return res
    .status(500)
    .json({ error: "Internal server error", details: error });
  }
};

// Create a new question
const createQuestion = async (req, res) => {
   const rawData = req.body;
    // Check if the request body is empty
    if (!rawData || Object.keys(rawData).length === 0) {
      return res.status(400).json({ status: false, error: 'Empty request body' });
    }
   
   console.log(rawData)
   const { language, question, options, answer, difficulty, difficultyLevel, point, excerciseNumber } = rawData
   // Check for missing fields
   const missingFields = [];
   if (!language) missingFields.push('language');
   if (!question) missingFields.push('question');
   if (!options) missingFields.push('options');
   if (!answer) missingFields.push('answer');
   if (!difficulty) missingFields.push('difficulty');
   if (!difficultyLevel) missingFields.push('difficultyLevel');
   if (!point) missingFields.push('point');
   if (!excerciseNumber) missingFields.push('excerciseNumber');
 
   if (missingFields.length > 0) {
     return res.status(400).json({ status:true, error: `Missing fields: ${missingFields.join(', ')}` });
   }
 
  try {
    const newQuestion = await prisma.question.create({
      data: {
        language,
        question,
        options,
        answer,
        difficulty,
        difficultyLevel,
        point,
        excerciseNumber,
      },
    });

    return res.status(201).json({status:true, data:newQuestion});

  } catch (error) {
    return res
    .status(500)
    .json({ error: "Internal server error", details: error });
  }
};

// Update a question by ID
const updateQuestion = async (req, res) => {
  const id = req.params.id;
  const rawData = req.body;
  console.log(Object.keys(rawData)[0])
  const dataToUpdate = Object.keys(rawData)[0]

  try {
    const updatedQuestion = await prisma.question.update({
      where: { id: id },
      data: dataToUpdate
    });

    return res.status(200).json({status:true, data:updatedQuestion});
  } catch (error) {
    return res
    .status(500)
    .json({ error: "Internal server error", details: error });
  }
};

// Delete a question by ID
const deleteQuestion = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedQuestion = await prisma.question.delete({
      where: { id: id },
    });

    return res.status(200).json({status:true, message:"Deleted succesfully"});
  } catch (error) {
    return res
    .status(500)
    .json({ error: "Internal server error", details: error });
  }
};

export { getAllQuestions, getQuestionById, createQuestion, updateQuestion, deleteQuestion };
