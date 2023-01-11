import * as topicsService from "../../services/topicsService.js";

const showQuiz = async ({ render }) => {
    render("quiz.eta", {topics : await topicsService.getTopicsFromDb()});
};

const getQuizQuestions = async ({params, render, response}) => {
    const topic_id = params.tId;

    const randomQuestion = await topicsService.selectRandomQuestion(topic_id);
    
    if (randomQuestion == undefined) {
        render("quizquestion.eta", {questionerror : true});
    } else {
        const qId = randomQuestion.id;
        response.redirect(`/quiz/${topic_id}/questions/${qId}`);
    } 
};

const showQuizQuestions = async ({params ,render}) => {
    const qId = params.qId;
    render("quizquestion.eta", {questiondata : await topicsService.getQuestionById(qId),
        answeroptiondata : await topicsService.getanswerOptionsByQuestionId(qId)});
};

const submitAnswer = async ({params, user, response}) => {
    const userId = user.id;
    const qId = params.qId;
    const oId = params.oId;
    const tId = params.tId;

    await topicsService.addQuizAnswer(userId, qId, oId);
    const option = await topicsService.getanswerOptionById(oId);
    if (option[0].is_correct == true) {
        response.redirect(`/quiz/${tId}/questions/${qId}/correct`);
    } else {
        response.redirect(`/quiz/${tId}/questions/${qId}/incorrect`);
    }
    
};

const showCorrect = async ({params, render}) => {
    render("correct.eta", {data : params.tId})
};

const showIncorrect = async ({params, render}) => {
    const Ans = await topicsService.getanswerOptionsByQuestionId(params.qId);
    //haetaan oikea/oikeat vastaukset
    const rightAnswers = [];
    for (let i = 0; i < Ans.length; i++) {
        if (Ans[i].is_correct == true) {
            rightAnswers.push(Ans[i].option_text);
        }
    }
    render("incorrect.eta", {data : params.tId, correct: rightAnswers})
};

export {
    showQuiz,
    showQuizQuestions,
    getQuizQuestions,
    submitAnswer,
    showCorrect,
    showIncorrect,
};