# my-app

A small React, TypeScript, and Tailwind number game built with Vite.

## Scripts

- `npm run dev` starts the development server.
- `npm run build` creates a production build.
- `npm run lint` checks the code with ESLint.
- `npm run preview` previews the production build locally.

## Commit Workflow

- Pre-commit hooks run `npm run lint`.
- Commit messages are validated with Conventional Commits.

Examples:

- `feat: add progress bar`
- `fix: prevent timer from going negative`
- `chore: update dependencies`
# The Flipped Number

The Flipped Number is a small React + TypeScript + Vite game where you read a mirrored number and enter the original value before the timer runs out.

## Features

- Fast-paced number puzzle gameplay
- 2-minute timer
- Score tracking across 6 questions
- Replay button to restart instantly

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4

## Getting Started

Install dependencies:

```bash
npm install
```

Run the app in development mode:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## How To Play

1. Look at the flipped number on the screen.
2. Type the original number into the input field.
3. Click `Check` or press `Enter`.
4. Answer all 6 questions before the timer reaches zero.

## Project Structure

- `src/App.tsx` - main app layout
- `src/updowngame/Updowngame.tsx` - game logic and UI
- `src/index.css` - global styles
- `src/App.css` - page styling

## Notes

- The game starts automatically when the page loads.
- Use `Replay` to restart the round at any time.
