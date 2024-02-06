import { PrismaClient } from '../prisma/generated/client/index.js';
const prisma = new PrismaClient();

// Get all questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await prisma.question.findMany();
    return res.status(200).json({status:true, data:questions});

  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", details: error });
  }
};

// Get a single question by ID
const getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await prisma.question.findUnique({
      where: { _id: id },
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
  const { text, options, answer, difficulty, difficultyLevel, point, excerciseNumber } = req.body;

   // Check for missing fields
   const missingFields = [];
   if (!text) missingFields.push('text');
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
        text,
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
  const { id } = req.params;
  const dataToUpdate = req.body;

  try {
    const updatedQuestion = await prisma.question.update({
      where: { _id: id },
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
  const { id } = req.params;

  try {
    const deletedQuestion = await prisma.question.delete({
      where: { _id: id },
    });

    res.json(deletedQuestion);
  } catch (error) {
    return res
    .status(500)
    .json({ error: "Internal server error", details: error });
  }
};

export { getAllQuestions, getQuestionById, createQuestion, updateQuestion, deleteQuestion };
