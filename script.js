class QuizApp {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];

        // DOM Elements
        this.startScreen = document.getElementById('start-screen');
        this.quizScreen = document.getElementById('quiz-screen');
        this.resultsScreen = document.getElementById('results-screen');
        this.fileInput = document.getElementById('quiz-file');
        this.questionNumber = document.getElementById('question-number');
        this.scoreDisplay = document.getElementById('score');
        this.progressFill = document.getElementById('progress-fill');
        this.questionText = document.getElementById('question-text');
        this.answerContainer = document.getElementById('answer-container');
        this.percentage = document.getElementById('percentage');
        this.scoreText = document.getElementById('score-text');
        this.questionsReview = document.getElementById('questions-review');
        this.restartBtn = document.getElementById('restart-btn');
        this.newQuizBtn = document.getElementById('new-quiz-btn');

        // Event Listeners
        this.fileInput.addEventListener('change', this.handleFileUpload.bind(this));
        this.restartBtn.addEventListener('click', this.restartQuiz.bind(this));
        this.newQuizBtn.addEventListener('click', this.startNewQuiz.bind(this));
    }

    async handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const text = await file.text();
            const questions = JSON.parse(text);

            // Pre-process fill-in-the-blank answers to be lowercase
            this.questions = questions.map(q => ({
                ...q,
                answer: q.type === 'fill-in-the-blank' ? q.answer.trim().toLowerCase() : q.answer
            }));

            // Shuffle questions
            this.questions.sort(() => Math.random() - 0.5);

            this.startQuiz();
        } catch (error) {
            alert('Invalid JSON file format');
        }
    }

    startQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.showScreen('quiz');
        this.displayQuestion();
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        this.questionText.textContent = question.question;
        this.updateProgress();

        this.answerContainer.innerHTML = '';

        switch (question.type) {
            case 'multiple-choice':
                this.displayMultipleChoice(question);
                break;
            case 'true/false':
                this.displayTrueFalse(question);
                break;
            case 'fill-in-the-blank':
                this.displayFillInTheBlank();
                break;
        }
    }

    displayMultipleChoice(question) {
        const options = [...question.options].sort(() => Math.random() - 0.5);
        options.forEach(option => {
            const button = this.createAnswerButton(option);
            this.answerContainer.appendChild(button);
        });
    }

    displayTrueFalse() {
        ['True', 'False'].forEach(option => {
            const button = this.createAnswerButton(option);
            this.answerContainer.appendChild(button);
        });
    }

    displayFillInTheBlank() {
        const container = document.createElement('div');
        container.className = 'fill-in-blank-container';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'answer-input';
        input.placeholder = 'Type your answer...';

        const submitBtn = document.createElement('button');
        submitBtn.className = 'submit-btn';
        submitBtn.textContent = 'Submit';
        submitBtn.onclick = () => this.handleAnswer(input.value);

        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'feedback hidden';

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleAnswer(input.value);
            }
        });

        container.appendChild(input);
        container.appendChild(submitBtn);
        container.appendChild(feedbackDiv);
        this.answerContainer.appendChild(container);
    }

    createAnswerButton(text) {
        const button = document.createElement('button');
        button.className = 'answer-button';
        button.textContent = text;
        button.onclick = () => this.handleAnswer(text);
        return button;
    }

    handleAnswer(answer) {
        const question = this.questions[this.currentQuestionIndex];
        const buttons = this.answerContainer.querySelectorAll('button');
        const input = this.answerContainer.querySelector('input');
        const feedbackDiv = this.answerContainer.querySelector('.feedback');

        // Disable all inputs
        buttons.forEach(btn => btn.disabled = true);
        if (input) input.disabled = true;

        // Process answer for fill-in-the-blank
        const processedAnswer = question.type === 'fill-in-the-blank'
            ? answer.trim().toLowerCase()
            : answer;

        const isCorrect = processedAnswer === question.answer;

        if (isCorrect) {
            this.score++;
        }

        // Show visual feedback
        if (question.type === 'fill-in-the-blank' && feedbackDiv) {
            feedbackDiv.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
            feedbackDiv.innerHTML = `
                <p>${isCorrect ? 'Correct!' : 'Incorrect!'}</p>
                ${!isCorrect ? `<p>The correct answer is: ${question.answer}</p>` : ''}
            `;
            input.classList.add(isCorrect ? 'correct' : 'incorrect');
        } else if (buttons.length) {
            buttons.forEach(btn => {
                if (btn.textContent === answer) {
                    btn.classList.add(isCorrect ? 'correct' : 'incorrect');
                }
                if (btn.textContent === question.answer) {
                    btn.classList.add('correct');
                }
            });
        }

        this.userAnswers.push(answer);
        this.updateScore();

        // Wait before moving to next question
        setTimeout(() => {
            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.currentQuestionIndex++;
                this.displayQuestion();
            } else {
                this.showResults();
            }
        }, 1500);
    }

    updateProgress() {
        const current = this.currentQuestionIndex + 1;
        const total = this.questions.length;
        this.questionNumber.textContent = `Question ${current} of ${total}`;
        this.progressFill.style.width = `${(current / total) * 100}%`;
    }

    updateScore() {
        this.scoreDisplay.textContent = `Score: ${this.score}`;
    }

    showResults() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        this.percentage.textContent = `${percentage}%`;
        this.scoreText.textContent = `You got ${this.score} out of ${this.questions.length} questions correct`;

        this.questionsReview.innerHTML = '';
        this.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            const isCorrect = question.type === 'fill-in-the-blank'
                ? userAnswer.trim().toLowerCase() === question.answer
                : userAnswer === question.answer;

            const reviewItem = document.createElement('div');
            reviewItem.className = `review-item ${isCorrect ? 'correct' : 'incorrect'}`;
            reviewItem.innerHTML = `
                <p><strong>${question.question}</strong></p>
                <p>Your answer: ${userAnswer}</p>
                <p>Correct answer: ${question.answer}</p>
            `;
            this.questionsReview.appendChild(reviewItem);
        });

        this.showScreen('results');
    }

    showScreen(screen) {
        this.startScreen.classList.add('hidden');
        this.quizScreen.classList.add('hidden');
        this.resultsScreen.classList.add('hidden');

        switch (screen) {
            case 'start':
                this.startScreen.classList.remove('hidden');
                break;
            case 'quiz':
                this.quizScreen.classList.remove('hidden');
                break;
            case 'results':
                this.resultsScreen.classList.remove('hidden');
                break;
        }
    }

    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.questions.sort(() => Math.random() - 0.5);
        this.showScreen('quiz');
        this.displayQuestion();
    }

    startNewQuiz() {
        this.fileInput.value = '';
        this.showScreen('start');
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});