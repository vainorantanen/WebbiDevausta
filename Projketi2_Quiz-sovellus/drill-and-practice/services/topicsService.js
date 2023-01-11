import { executeQuery } from "../database/database.js";

const getTopicsFromDb = async () => {
    const res = await executeQuery("SELECT * FROM topics ORDER BY name");
    return res.rows;
};

const getTopicById = async (id) => {
    const res = await executeQuery("SELECT * FROM topics WHERE id = $id", {id : id});
    return res.rows[0];
};

const addTopicTodb = async (userId, name) => {
    await executeQuery("INSERT INTO topics (user_id, name) VALUES ($userId, $name)",
    {name: name, userId: userId});

};

const addQuestionToDb = async (userId, topic_id, question_text) => {
    await executeQuery("INSERT INTO questions (user_id, topic_id, question_text) VALUES ($userId, $topic_id, $question_text)",
    {userId: userId, topic_id: topic_id, question_text: question_text});
};

const getQuestionsByTopicId = async (topicId) => {
    const res = await executeQuery("SELECT * FROM questions WHERE topic_id = $TopicId",
    {topicId: topicId});
    return res.rows;
};

const getQuestionById = async (id) => {
    const res = await executeQuery("SELECT * FROM questions WHERE id =$id",
    {id: id});
    return res.rows[0];
};

const addAnswerOptionToDb = async (qid, option_text, is_correct) => {
    await executeQuery("INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES ($qid, $option_text, $is_correct)",
    {qid: qid, option_text: option_text, is_correct: is_correct});
};

const getanswerOptionsByQuestionId = async (question_id) => {
    const res = await executeQuery("SELECT * FROM question_answer_options WHERE question_id = $question_id",
    {question_id: question_id});
    return res.rows;
};

const deleteAnswerOptionsFromDb = async (id) => {
    await executeQuery("DELETE FROM question_answers WHERE question_answer_option_id = $id",
    {id: id});

    await executeQuery("DELETE FROM question_answer_options WHERE id = $id", {
        id: id
    });
};

const deleteQuestionFromDb = async (question_id) => {
    await executeQuery("DELETE FROM questions WHERE id = $question_id", {question_id: question_id});
};

const deleteTopicFromDb = async (topicId) => {
    await executeQuery("DELETE FROM question_answers WHERE question_id IN (SELECT id FROM questions WHERE topic_id = $topicId)",
    {topicId: topicId});

    await executeQuery("DELETE FROM question_answer_options WHERE question_id IN (SELECT id FROM questions WHERE topic_id = $topicId)", {
        topicId: topicId
    });

    await executeQuery("DELETE FROM questions WHERE topic_id = $topicId", { topicId: topicId});

    await executeQuery("DELETE FROM topics WHERE id = $topicId", {
        topicId: topicId
    });
};

const countTopics = async () => {
    const res = await executeQuery("SELECT COUNT(id) as luku FROM topics;");
    return res.rows[0].luku;
};

const countQuestions = async () => {
    const res = await executeQuery("SELECT COUNT(id) as luku FROM questions;");
    return res.rows[0].luku;
};

const countAnswers = async () => {
    const res = await executeQuery("SELECT COUNT(id) as luku FROM question_answers;");
    return res.rows[0].luku;
}

const selectRandomQuestion = async (topicId) => {
    const res = await executeQuery("SELECT * FROM questions WHERE topic_id = $topicId ORDER BY RANDOM() LIMIT 1",
    {topicId: topicId});
    return res.rows[0];
};

const getRandomQuestionFromQuestions = async () => {
    const res = await executeQuery("SELECT * FROM questions ORDER BY RANDOM() LIMIT 1");
    return res.rows[0];
}

const addQuizAnswer = async (userId, qId, oId) => {
    await executeQuery("INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES ($userId, $qId, $oId)",
    {userId: userId, qId: qId, oId: oId});
};

const getanswerOptionById = async (id) => {
    const res = await executeQuery("SELECT * FROM question_answer_options WHERE id = $id",
    {id : id});
    return res.rows;
};

export {
    getTopicsFromDb,
    countQuestions,
    deleteTopicFromDb,
    deleteQuestionFromDb,
    getTopicById,
    addTopicTodb,
    addQuestionToDb,
    getQuestionsByTopicId,
    getQuestionById,
    addAnswerOptionToDb,
    getanswerOptionsByQuestionId,
    deleteAnswerOptionsFromDb,
    countTopics,
    countAnswers,
    selectRandomQuestion,
    addQuizAnswer,
    getanswerOptionById,
    getRandomQuestionFromQuestions,
};