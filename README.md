# Trivia App!

Welcome to the Trivia App Minigame! This project was bootstrapped using CreateReactApp. Clone it into your favorite code editor and run npm install from inside the folder to install the project dependencies (which include React, React DOM, and the React Testing Library + Jest) listed in the package.json. You must have node installed (any version >= 10) on your local machine.

You can check which version of node you have installed, if any, by typing 'node --version' in the terminal command line.

## npm start

Run npm start to launch the react start script, which will build the code and open the application in Chrome.

## npm test

Run npm test to check changes against the unit tests written in App.test.js. These tests employ Jest and React Testing Library to mock component behavior from a user experience perspective, though they're not yet as comprehensive as I'd like.

## Project Board

View the Github project board used while building this project at https://github.com/madelineurl/trivia-app/projects/1.

## Future updates

Up next for this project: implementing a login/logout flow and storing user and game data in a database so users can practice more than once. Potentially introducing a state management tool to simplify prop drilling through React components. Improving the current test suite to make it more comprehensive. Refactoring to use React Hooks.

I also plan to improve the user interface design and CSS transitions.

## Complexity

The pickTenRandomQuestions() function uses a nested loop to populate the game state with ten random questions. This function has a big O runtime of n^2, and I'd like to optimize it in the future.

## Thank you!

Building this project has been a fun way to spend my free time this week. Thank you for the challenge!
