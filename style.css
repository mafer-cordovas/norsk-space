/* General body styling */
body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #333;
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    line-height: 1.6;
    background-color: #f0f2f5; /* A subtle background for the whole page */
    display: flex; /* Use flexbox to center content */
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* Full viewport height */
}

/* Container for the entire exercise */
.exercise-container {
    background-color: #ffffff; /* White background for the card */
    border: 1px solid #e0e0e0;
    border-radius: 12px; /* More rounded corners */
    padding: 25px;
    max-width: 550px; /* Slightly wider for better spacing */
    width: 100%; /* Ensure it takes full width within max-width */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* More pronounced shadow */
    transition: all 0.3s ease-in-out;
}

/* Hover effect for the container */
.exercise-container:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
}

h2 {
    color: #0056b3; /* A deeper blue for the heading */
    margin-top: 0;
    text-align: center;
    font-size: 1.8em;
    margin-bottom: 15px;
    font-weight: 700;
}

.instructions {
    font-style: italic;
    color: #6c757d;
    text-align: center;
    margin-bottom: 30px;
    font-size: 1em;
    line-height: 1.4;
}

/* Styling for individual questions */
.question-list {
    margin-bottom: 25px;
}

.question {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap; /* Allow wrapping on smaller screens */
    align-items: center; /* Align items vertically */
    justify-content: space-between;
    gap: 10px; /* Space between prompt/input and hint */
}

.prompt {
    font-size: 1.15em;
    color: #212529;
    flex-grow: 1; /* Allow prompt to take available space */
    display: flex; /* For aligning input with text */
    align-items: center;
    gap: 8px; /* Space between text and input */
}

.hint {
    font-size: 0.9em;
    color: #999;
    flex-shrink: 0; /* Prevent hint from shrinking too much */
    background-color: #e9ecef;
    padding: 4px 8px;
    border-radius: 5px;
    border: 1px dashed #ced4da;
}

/* Input field styling */
.input-field {
    width: 80px; /* Slightly wider for better appearance */
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 8px; /* More rounded corners */
    font-size: 1.05em;
    transition: border-color 0.3s, box-shadow 0.3s, background-color 0.3s;
    outline: none; /* Remove default outline */
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.input-field:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.15); /* Focus glow */
    background-color: #fff;
}

/* Feedback colors for input fields */
.input-field.correct {
    border-color: #28a745 !important; /* Green for correct */
    background-color: #e6ffed; /* Light green background */
    box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
}

.input-field.incorrect {
    border-color: #dc3545 !important; /* Red for incorrect */
    background-color: #ffe6e6; /* Light red background */
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

/* Button styling */
button {
    display: block;
    width: 100%;
    padding: 14px 20px;
    margin-top: 30px;
    background: linear-gradient(145deg, #28a745, #218838); /* Gradient green button */
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.2em;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3); /* Softer shadow */
    letter-spacing: 0.5px;
}

button:hover {
    background: linear-gradient(145deg, #218838, #1e7e34); /* Darker gradient on hover */
    transform: translateY(-3px); /* More noticeable lift effect */
    box-shadow: 0 8px 20px rgba(40, 167, 69, 0.4);
}

button:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

/* Feedback message area */
#feedback-message {
    text-align: center;
    margin-top: 25px;
    font-weight: bold;
    font-size: 1.2em;
    min-height: 1.8em; /* Ensure space even when empty */
    padding: 5px;
    border-radius: 5px;
}

/* Responsive adjustments */
@media (max-width: 600px) {
    body {
        padding: 10px; /* Reduce overall body padding on small screens */
    }
    .exercise-container {
        padding: 20px;
        border-radius: 8px; /* Slightly less rounded on small screens */
    }
    h2 {
        font-size: 1.5em;
    }
    .instructions {
        font-size: 0.9em;
    }
    .question {
        flex-direction: column; /* Stack prompt and hint on small screens */
        align-items: flex-start;
        gap: 8px;
    }
    .hint {
        margin-left: 0;
        width: auto; /* Allow hint to size naturally */
    }
    .input-field {
        width: 100px; /* Give more space to input field */
    }
    .prompt {
        width: 100%; /* Make prompt take full width */
    }
    button {
        font-size: 1.1em;
        padding: 12px 15px;
    }
}
