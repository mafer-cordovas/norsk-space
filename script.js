document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the form from submitting normally
    
    const answers = {
        q1: 'jeg',
        q2: 'du',
        q3: 'er',
        q4: 'de',
        q5: 'er'
    };
    
    let allCorrect = true;
    const feedbackDiv = document.getElementById('feedback');
    feedbackDiv.innerHTML = '';
    
    for (const key in answers) {
        const input = document.getElementById(key);
        const userAnswer = input.value.trim().toLowerCase();
        
        if (userAnswer === answers[key]) {
            input.style.borderColor = 'green';
            input.style.color = 'green';
        } else {
            input.style.borderColor = 'red';
            input.style.color = 'red';
            allCorrect = false;
        }
    }
    
    if (allCorrect) {
        feedbackDiv.textContent = 'Great job! You got all the answers correct. 🎉';
        feedbackDiv.className = 'feedback correct';
    } else {
        feedbackDiv.textContent = 'Some answers are incorrect. Please try again.';
        feedbackDiv.className = 'feedback incorrect';
    }
});
