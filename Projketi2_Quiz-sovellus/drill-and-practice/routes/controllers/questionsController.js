import * as topicsService from "../../services/topicsService.js";
import { validasaur } from "../../deps.js";

const answerOptionValidationRules = {
    option_text : [validasaur.required, validasaur.minLength(1)]
};

const viewQuestion = async ({params, render}) => {
    const questionId = params.qId;

    const tiedot = await topicsService.getQuestionById(questionId);

    const vaihtoehdot = await topicsService.getanswerOptionsByQuestionId(questionId);

    render("question.eta", {data: tiedot, qaodata : vaihtoehdot});
};

const getAnswerOptionData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
        question_id : params.get("question_id"),
        option_text : params.get("option_text"),
        is_correct : params.get("is_correct")
    };
};

const addAnswerOption = async ({params, request, response, render}) => {
    const optionData = await getAnswerOptionData(request);

    const [passes, errors] = await validasaur.validate(optionData, answerOptionValidationRules);

    if (!passes) {
        console.log(errors);
        optionData.validationErrors = errors;
        const kysymyksenTiedot = await topicsService.getQuestionById(params.qId);
        optionData.data = kysymyksenTiedot;
        const vaihtoehdot = await topicsService.getanswerOptionsByQuestionId(params.qId);
        optionData.qaodata = vaihtoehdot;
        render("question.eta", optionData);
    } else {
    //checkbuttonin tarkistus
        let oikeus = false;
        if (optionData.is_correct == "on") {
            oikeus = true;
        };

        await topicsService.addAnswerOptionToDb(params.qId, optionData.option_text, oikeus);
        response.redirect(`/topics/${params.id}/questions/${params.qId}`);
    }
};

const deleteAnswerOption = async ({params, response, request}) => {
    const option_id = params.oId;
    await topicsService.deleteAnswerOptionsFromDb(option_id);
    response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
};

const deleteQuestion = async ({params, request, response}) => {
    await topicsService.deleteQuestionFromDb(params.qId);
    response.redirect(`/topics/${params.tId}`);
};

export {
    viewQuestion,
    addAnswerOption,
    deleteAnswerOption,
    deleteQuestion,
};