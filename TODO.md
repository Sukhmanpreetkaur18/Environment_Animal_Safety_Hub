# User Progress Tracking for Quizzes Feature Implementation

## Tasks
- [x] Create `frontend/js/global/font-size-changer.js` module for font size adjustments with localStorage persistence and accessibility
- [x] Update `frontend/components/navbar.html` to add font size increase/decrease buttons next to theme toggle
- [x] Update `frontend/css/style.css` to use CSS variable (--base-font-size) for dynamic font size adjustment
- [x] Ensure font-size-changer.js is loaded in HTML pages
- [x] Test font size changer functionality across pages
- [x] Ensure accessibility compliance (keyboard navigation, screen reader support)

# User Progress Tracking for Quizzes Feature Implementation

## Tasks
- [x] Extend `frontend/assets/data/quiz-data.json` with progress metadata structure (e.g., object for user progress: current index, answers, score, time)
- [x] Update `frontend/css/pages/quizzes/quiz.css` to add progress bar styling (`.progress-bar`, `.progress-fill` with animations and responsive design)
- [x] Modify `frontend/js/pages/quizzes/quiz.js` to load quiz data from JSON and use localStorage for progress tracking
- [x] Update `startQuiz()` in `quiz.js` to check for existing progress and allow resuming
- [x] Add progress bar element to the quiz screen in `quiz.js`
- [x] Add "Resume Quiz" button to the start screen in `quiz.js` if saved progress is detected
- [x] Update `loadQuestion()` in `quiz.js` to update progress bar
- [x] Save progress on each answer selection in `quiz.js`
- [x] Test saving/loading progress across browser sessions
- [x] Verify progress bar updates correctly during quiz
- [x] Ensure "Resume Quiz" functionality works seamlessly
