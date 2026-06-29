# Snake Game

A polished browser-based Snake game built using plain HTML, CSS, and JavaScript.

## Overview

This project recreates the classic Snake arcade experience in a responsive web layout. The snake moves across a grid, eats food, grows longer, and loses the game when it collides with the edge or itself.

## Features

- Classic snake movement using arrow keys
- Automatically generated food items
- Score tracking and high score persistence with `localStorage`
- Start and restart controls via modal dialogs
- Simple responsive grid-based board layout

## Project Structure

- `index.html` — application markup and UI structure
- `style.css` — core page styles, layout, and game board styling
- `theme.css` — theme variables used across the UI
- `script.js` — game state, movement logic, collision detection, and input handling
- `README.md` — project documentation

## Installation & Usage

1. Clone or download the repository.
2. Open `index.html` in a modern web browser.
3. Press **Start** to begin the game.
4. Control the snake using the arrow keys.

### Controls

- `ArrowUp` — Move up
- `ArrowDown` — Move down
- `ArrowLeft` — Move left
- `ArrowRight` — Move right

## Gameplay Rules

- The snake grows by one segment when it eats food.
- The score increases each time food is eaten.
- The game ends when the snake hits the border or itself.
- The highest score is saved in the browser so it persists across sessions.

## Development Notes

- This project is built without frameworks or build tools.
- The logic is contained in `script.js`, while presentation is handled by `style.css` and `theme.css`.
- To customize the board size, adjust the CSS grid settings and block dimensions.

## Future Improvements

- Add sound effects and animations
- Support touch controls for mobile devices
- Add pause/resume functionality
- Add difficulty levels or speed settings

## License

This project is open source and available for personal or educational use.
