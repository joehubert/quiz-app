# Simple Quiz App

This is a lightweight web-based quiz application built using HTML and JavaScript. It does not require a server and runs entirely in a browser. While similar products and projects exist, this app offers a simple, free, and easy way for students and others to prepare for tests and quizzes.

## Download and Run

1. **Download the Files**  
   - Clone the repository (if hosted on GitHub):  
     ```sh
     git clone https://github.com/your-repo/quiz-app.git
     cd quiz-app
     ```
   - OR manually download these three files:
     - `index.html`
     - `script.js`
     - `style.css`
     - (Place them in the same directory.)

2. **Run the App**  
   - Open `index.html` in a web browser.

## Adding Quiz Questions

The app loads quiz questions from a JSON file. You can create your own question sets or generate them using a chatbot.

### Using the Sample and Schema JSON Files ###

To help you get started, two files are provided in the project:

* json/sample.json: A ready-to-use example of quiz questions.
* json/schema.json: Defines the structure your JSON file should follow, ensuring compatibility with the app.

Use these as references when creating your own quizzes.

### Generating a Question Set with a Chatbot

You can use your favorite chatbot (e.g., ChatGPT) to generate quiz questions in the required JSON format. Try prompting:

> "Create a JSON file for a quiz app with 5 multiple-choice, 3 true/false, and 2 fill-in-the-blank questions. Follow this schema:"
(Attach the schema.json file or copy its content into the prompt.)

You can also provide the sample.json as a reference for the desired structure and content.

**Example**
> "Generate 50 questions of quiz content for a high school student preparing to take their written behind-the-wheel driver's exam in New Jersey. See the attached sample and schema json files for guidance on the quiz content structure." (Attach the schema.json and sample.json files...)

**Note:** Chatbots may have limitations on the amount of content they can generate in a single prompt. If you want a large number of questions, you may need to generate several files over multiple prompts or manually concatenate the JSON into a larger file.

### Using Study Guides to Build Questions

If you have a study guide from a teacher (in PDF, Word, or plain text), you can upload it to a chatbot and prompt:

> "Extract key facts and concepts from this study guide and convert them into quiz questions. Use multiple-choice, true/false, and fill-in-the-blank formats in JSON. Follow this schema:"
(Attach the schema.json file or copy its content into the prompt.)

Then, save the generated JSON file and load it into the quiz app.

## Loading a Quiz JSON File

When launching the app, you’ll be prompted to select a JSON file with quiz questions. Choose your file, and the quiz will begin!

## Resetting or Changing Quizzes

After completing a quiz, you’ll have options to:
- Restart the same quiz.
- Load a new quiz file.

Enjoy testing your knowledge!
