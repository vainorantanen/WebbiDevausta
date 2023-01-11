Implement tests here.

All tests for this project are end to end tests. They can be found in the e2e-playwright folder
and in the topic-management.spec.js file.

The tests include:
- Main page has expected title.
- Login page has expected title and headings.
- Register page has expected title.
- Can create a user.
- Can login.
- Navigates to login when trying to entry path quiz as unauthorized user
- Navigates to login when trying to entry path topics as unauthorized user
- Nav bar is not visible in the main page when noboy is logged in
- No errros on statistics
- Page shows statistics

The tests can be run with the command:
docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf