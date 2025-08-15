/**
 * Checks the user's answers against predefined correct answers.
 * Updates input field styles and displays a feedback message.
 */
function checkAnswers() {
    // Define the correct answers for each question ID
    const answers = {
        q1: "jeg", // I
        q2: "du",  // You (singular informal)
        q3: "er",  // is/are
        q4: "de",  // They
        q5: "er"   // is/are
    };

    let correctCount = 0; // Counter for correct answers
    const feedbackMessage = document.getElementById('feedback-message'); // Get feedback display element

    // Loop through each question to check the answer
    for (const id in answers) {
        const input = document.getElementById(id); // Get the input field by its ID
        // Get user's answer, trim whitespace, and convert to lowercase for case-insensitive comparison
        const userAnswer = input.value.trim().toLowerCase();

        // Remove previous feedback classes
        input.classList.remove('correct', 'incorrect');

        // Check if the user's answer matches the correct answer
        if (userAnswer === answers[id]) {
            input.classList.add('correct'); // Add correct styling
            correctCount++; // Increment correct count
        } else {
            input.classList.add('incorrect'); // Add incorrect styling
        }
    }

    // Display overall feedback message
    if (correctCount === Object.keys(answers).length) {
        feedbackMessage.textContent = `🎉 Bravo! You got all ${correctCount} answers correct!`;
        feedbackMessage.style.color = '#28a745'; // Green color for success
    } else {
        feedbackMessage.textContent = `You got ${correctCount} out of ${Object.keys(answers).length} answers correct. Keep practicing!`;
        feedbackMessage.style.color = '#dc3545'; // Red color for incorrect
    }
}

/**
 * Resets the exercise by clearing all input fields and feedback messages.
 */
function restartExercise() {
    // Get all input fields
    const inputFields = document.querySelectorAll('.input-field');
    inputFields.forEach(input => {
        input.value = ''; // Clear the text in each input field
        input.classList.remove('correct', 'incorrect'); // Remove feedback styling
    });

    // Clear the feedback message
    const feedbackMessage = document.getElementById('feedback-message');
    feedbackMessage.textContent = '';
    feedbackMessage.style.color = ''; // Reset text color
}
