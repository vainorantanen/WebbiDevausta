import * as topicsService from "../../services/topicsService.js";

const getRandomQuestion = async ({response}) => {
    const product = {};
    const question = await topicsService.getRandomQuestionFromQuestions();
    
    if (question != undefined) {
        product.questionId = question.id;
        product.questionText = question.question_text;
        const options = await topicsService.getanswerOptionsByQuestionId(question.id);
        product.answerOptions = [];
        for (var i = 0; i < options.length; i++) {
            const olio = {};
            olio.optionId = options[i].id;
            olio.optionText = options[i].option_text;
            product.answerOptions.push(olio);
        }
        
    }
    response.body = product;
};

const answerToQuestion = async ({response, request}) => {
    const body = request.body({ type: "json" });
    const document = await body.value;
    const res = {correct : false};
    const optiondata = await topicsService.getanswerOptionById(document.optionId);
    if (optiondata[0].is_correct == true) {
        res.correct = true;
    }
    response.body = res;
};

export {
    getRandomQuestion,
    answerToQuestion,
}