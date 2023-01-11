import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicsController from "./controllers/topicsController.js";
import * as questionsController from "./controllers/questionsController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";

import * as questionApi from "./apis/questionAPI.js";

const router = new Router();

router.get("/", mainController.showMain);

router.post("/auth/register", registrationController.registerUser);
router.get("/auth/register", registrationController.showRegistrationForm);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/topics", topicsController.listTopics);
router.get("/topics/:id", topicsController.viewSpesificTopic);
router.post("/topics", topicsController.addTopic);
router.post("/topics/:id/delete", topicsController.deleteTopic);
router.post("/topics/:id/questions", topicsController.addQuestion);

router.get("/topics/:id/questions/:qId", questionsController.viewQuestion);
router.post("/topics/:tId/questions/:qId/delete", questionsController.deleteQuestion);
router.post("/topics/:id/questions/:qId/options", questionsController.addAnswerOption);

router.post("/topics/:tId/questions/:qId/options/:oId/delete", questionsController.deleteAnswerOption);

router.get("/quiz", quizController.showQuiz);
router.get("/quiz/:tId", quizController.getQuizQuestions);
router.get("/quiz/:tId/questions/:qId", quizController.showQuizQuestions);
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.submitAnswer);

router.get("/quiz/:tId/questions/:qId/correct", quizController.showCorrect);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.showIncorrect);

router.get("/api/questions/random", questionApi.getRandomQuestion);
router.post("/api/questions/answer", questionApi.answerToQuestion);

export { router };
