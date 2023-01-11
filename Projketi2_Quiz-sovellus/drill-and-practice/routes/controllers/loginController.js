import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";


const processLogin = async ({ request, response, state, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const userFromDatabase = await userService.findUserByEmail(
    params.get("email"),
  );

  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(
    params.get("password"),
    user.password,
  );

  if (userFromDatabase.length != 1 || !passwordMatches) {
    const error = true;
    render("login.eta", {possibleError: error});
  } else {

    await state.session.set("user", user);
    response.redirect("/topics");
  }
};

const showLoginForm = ({ render }) => {
  render("login.eta");
};

export { processLogin, showLoginForm };