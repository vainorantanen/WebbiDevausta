import * as topicsService from "../../services/topicsService.js";

const showMain = async ({ render }) => {
  render("main.eta", {noftopics: await topicsService.countTopics(), nofqs : await topicsService.countQuestions(),
  nofanswers: await topicsService.countAnswers()});
};

export { showMain };
