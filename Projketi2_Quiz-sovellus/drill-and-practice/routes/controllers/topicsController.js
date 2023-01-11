import * as topicsService from "../../services/topicsService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
  name: [validasaur.required, validasaur.minLength(1)],
};

const questionValidationRules = {
    question_text : [validasaur.required, validasaur.minLength(1)]
};

const listTopics = async ({render, user}) => {
    let isAdmin;
    if (user.id == 1) {
        isAdmin = true;
    } else {
        isAdmin = false;
    }
    render("topics.eta", {topics : await topicsService.getTopicsFromDb(),
    adminstate: user.id});
};

const viewSpesificTopic = async ({params, render}) => {
    render("spesifictopic.eta", {topic : await topicsService.getTopicById(params.id),
    questionsInTopic: await topicsService.getQuestionsByTopicId(params.id)});
};

const getTopicdata = async (request) => {
    const body = request.body({type: "form"});
    const params = await body.value;

    return {
        name : params.get("name"),
    };
};

const addTopic = async ({ request, response, render, user }) => {
    const topicData = await getTopicdata(request);

    let isAdmin = false;
    if (user.id == 1) {
        isAdmin = true;
    }

    const [passes, errors] = await validasaur.validate(topicData, topicValidationRules);
    if (!passes) {
        console.log(errors);
        topicData.validationErrors = errors;
        topicData.topics = await topicsService.getTopicsFromDb();
        topicData.adminstate = isAdmin;
        render("topics.eta", topicData);
    } else {
        await topicsService.addTopicTodb(user.id, topicData.name);
        response.redirect("/topics");
    }
};

//const deleteTopic = async ({params, response, user}) => {

    //if (user.id == 1) {
       // await topicsService.deleteTopicFromDb(params.id);
        
    //} else {
      //  console.log("Only admins can delete topics");
    //}

 //   response.redirect("/topics");
//};

const deleteTopic = async ({ params, response, state }) => {
    const id = params.id
    const isAdmin = (await state.session.get("user")).admin
    if (isAdmin) {
      await topicsService.deleteTopicFromDb(id);
    }
    response.redirect("/topics")
  }

const getQuestiondata = async (request) => {
    const body = request.body({type: "form"});
    const params = await body.value;

    return {
        question_text : params.get("question_text")
    };
};

const addQuestion = async ({params, render, response, request, user}) => {
    const questionData = await getQuestiondata(request);
    const [passes, errors] = await validasaur.validate(questionData, questionValidationRules);

    if (!passes) {
        console.log(errors);
        questionData.validationErrors = errors;
        questionData.topic = await topicsService.getTopicById(params.id);
        questionData.questionsInTopic = await topicsService.getQuestionsByTopicId(params.id);
        render("spesifictopic.eta", questionData);
    } else {
        await topicsService.addQuestionToDb(user.id, params.id, questionData.question_text);
        response.redirect(`/topics/${params.id}`);
    }
};



export {
    listTopics,
    viewSpesificTopic,
    addTopic,
    deleteTopic,
    addQuestion,
};