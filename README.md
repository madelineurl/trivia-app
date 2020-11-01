# Trivia App!

Welcome to the Trivia App Minigame! Clone this project into your favorite code editor and run npm install from inside the folder to get set up.

## npm start

This project was bootstrapped using CreateReactApp. Run npm start to launch the react start script, which will build the code and open the project in Chrome.

## npm test

Run npm test to check changes against the unit tests written in App.test.js.

## Project Board

You can see the Github project board used while building this project at https://github.com/madelineurl/trivia-app/projects/1.

## Future updates

Up next for this project: implementing a login/logout flow and storing user and game data in a database so users can practice more than once. Potentially introducing a state management tool to simplify prop drilling through React components. I'd also like to improve the user interface design and CSS transitions.

## Complexity

The pickTenRandomQuestions() function uses a nested loop to populate the game state with ten random questions. This function has a big O runtime of n^2, and I'd like to optimize it in the future.
