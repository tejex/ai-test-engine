# AI Test Engine

AI Test Engine is a study app that turns notes, PDFs, TXT, Markdown, and DOCX files into practice exams. Students can attach multiple note sources, generate an exam from that material, take the test, submit answers, and review previous attempts with AI-generated grading feedback.

The current product direction is exam-first: instead of only creating passive summaries, the app pushes students into active recall through generated questions, scored attempts, feedback, and result history.

## Current Features

- Paste notes as separate attached note cards.
- Import study material from `.pdf`, `.docx`, `.txt`, and `.md` files.
- Generate AI exams from submitted notes.
- Start every generated exam from the first question.
- Answer multiple question types:
  - Multiple choice
  - Multi-select
  - Short answer
  - True/false
  - Fill in the blank
  - Matching
  - Ordering
  - Scenario-based application
- Submit exams for AI grading.
- View previous attempts on the results page.
- Open recent tests from the navigation drawer.
- Delete individual previous attempts.
- Clear all previous attempts.
- Light/dark theme toggle.
- SQLite-backed persistence through Prisma.

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Material UI
- Axios
- PDF/DOCX text extraction with `pdfjs-dist` and `mammoth`

### Backend

- Node.js
- Express
- TypeScript
- Prisma
- SQLite
- Groq SDK for AI generation/grading
- Zod is available for validation work

## Project Structure

```txt
.
├── client/
│   └── src/
│       ├── api/              # Frontend API wrappers
│       ├── components/       # Shared UI and feature components
│       ├── hooks/            # Frontend data/loading hooks
│       ├── pages/            # Route-level pages
│       ├── styles/           # Theme and theme provider
│       └── utils/            # File text extraction utilities
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── db/                   # Shared Prisma client
│   ├── generated/            # Generated Prisma client
│   ├── lib/                  # API clients and shared backend libs
│   ├── routes/               # Domain route modules
│   ├── services/             # AI generation, grading, ingestion, prompts
│   ├── routes.ts             # Express route aggregator
│   └── server.ts             # Express server entry
└── package.json
```

## Getting Started

### 1. Install Dependencies

From the project root:

```bash
npm install
cd client
npm install
```

### 2. Configure Environment

Create a `.env` file in the project root:

```bash
GROQ_API_KEY=your_groq_api_key_here
```

The backend reads this key when generating questions and grading answers.

### 3. Prepare the Database

From the project root:

```bash
npx prisma generate
npx prisma migrate dev
```

The app currently uses SQLite through Prisma. Local data is stored in the Prisma SQLite database.

### 4. Run the App

From the project root:

```bash
npm run dev
```

This starts:

- Backend: `http://localhost:3001`
- Frontend: Vite will print the local frontend URL, usually `http://localhost:5173`

## Useful Commands

Run the full app:

```bash
npm run dev
```

Build the frontend:

```bash
cd client
npm run build
```

Open Prisma Studio:

```bash
npx prisma studio
```

## Main User Flow

1. Paste or import study notes on the home page.
2. Attach one or more notes.
3. Generate a test.
4. Take the exam from question one.
5. Submit the exam.
6. Review score, feedback, and previous attempts.
7. Return to previous results from the recent tests drawer or results page.

## Data Model Overview

The current Prisma schema centers on:

- `Document`: raw uploaded or pasted study material.
- `Chunk`: pieces of document content used as context for generation.
- `Test`: generated exam tied to a document.
- `Question`: generated exam questions.
- `Attempt`: a completed test submission.
- `Response`: the student's answer, score, correctness, and feedback for each question.

This gives the app enough history to show prior exams, delete attempts, and inspect detailed results.

## Current Architecture Notes

- Route pages are named by purpose, such as `HomePage`, `TestPage`, `ResultsPage`, and `ResultDetailPage`.
- Frontend API calls live in `client/src/api` instead of being scattered through components.
- Reusable data flows live in `client/src/hooks`, including:
  - `useGenerateTest`
  - `useTest`
  - `useRecentAttempts`
  - `useAttemptResult`
- Page-level layout is centralized in `PageFrame`.
- The note input UI is split into smaller note-focused components.
- Backend routes are split by domain under `src/routes`.
- Prisma client setup is centralized in `src/db/prisma.ts`.

## Later Features

The app is currently focused on AI-generated exams, but the learning experience can expand beyond tests.

Planned or possible future features:

- Flashcard generation from notes and previous missed questions.
- Spaced repetition scheduling for flashcards and weak topics.
- Study guides and condensed summaries from uploaded notes.
- Topic mastery tracking across multiple attempts.
- Targeted practice sets based on incorrect answers.
- Better loading states during AI generation and grading.
- Exam date planning and daily study recommendations.
- Exportable exams and printable study material.
- Editable generated questions before taking a test.
- Support for more specialized question formats, such as coding questions and topic-aware worked problems.
- Learning material library where students can revisit notes, generated tests, flashcards, summaries, and study plans from one place.

## Near-Term Technical Improvements

- Add stronger request/response validation.
- Improve typed API models shared between frontend and backend.
- Add route-level lazy loading for frontend performance.
- Add better error and empty states across the UI.
- Add automated tests for generation, grading, and attempt deletion flows.
