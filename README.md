[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ATV5e7Id)

https://gmt-458-web-gis.github.io/geogame-atakandemirezen/

# ADAPTATION TO WORLD - GAME

## Game interface
![image](https://github.com/user-attachments/assets/2c8c96ec-1387-475e-82c6-a4c27a17a8dd)





## REQUIREMENTS
HTML, CSS and JS.

### Score section :  The game continues until the time runs out and the players try to get the most points. (Each question is 10 points)
### Map Section :  There is a leaflet @OpenStreetMap map in the middle of our interface and our game is played on that screen.
### Answer Choices: Our players are given 4 answer choices and are asked to choose the correct one.
### Time Section  : Our player has exactly 100 seconds to answer the questions.
### Pause Section : If our player wants to stop the time, he can press the pause button. If he wants to start it again, he just presses the continue button.
### Normal and Hard Mode : ![image](https://github.com/user-attachments/assets/188c50c5-0f64-494a-b233-e8861eb2ac68) , ![image](https://github.com/user-attachments/assets/c835515d-2e41-401f-ba9b-5d7a0c76bf35)


### Game-Info Section : ![image](https://github.com/user-attachments/assets/5dfcc9e6-5f7d-404c-810e-d2ab4cd0dea5)


## EVENT HANDLERS

* Difficulty Selection Buttons (HTML IDs: easy and hard):
  These buttons allow users to select the difficulty level (normal or hard). Once clicked, the difficulty level is set, the selection menu is hidden, and the game starts.

* Pause Button (HTML ID: pauseButton):
  Toggles the game between paused and active states. Updates the button's text to reflect the current state ("Pause" or "Continue") and disables or enables game interactions.

* Answer Buttons for Country Options:
  When a player selects an option (one of the country names), this handler checks whether the selected answer is correct or incorrect. It adjusts the score and moves to the next question or triggers the capital    question phase.

* Capital Question Submission (HTML ID: submitAnswer):
  When the player submits an answer for the capital question, this handler validates the answer. If correct, the player is redirected to the main game with their score intact; otherwise, the game ends.

## CLOSURES

* Timer Management: The startTimer function creates a closure over the timeLeft variable. The timer function inside setInterval has access to this variable, even though timeLeft is defined outside its local scope. This ensures that the countdown logic can continuously update the timer without exposing timeLeft globally.

* Answer Validation in Event Handlers: When generating the answer buttons for country options, each button’s event listener captures the option variable in a closure. This ensures that each button "remembers" which option it represents when clicked.

* Score Preservation During Redirection: When transitioning from the capital question page back to the main game, the score is passed and preserved using local storage. This is a practical application of the closure concept, where functions indirectly benefit from the encapsulated variable (currentScore) through the browser’s storage mechanisms.

## DOM

 * Dynamically Updating Content: Each time a new question was generated, the DOM was updated with the new country name or capital question. This was achieved by setting the innerText property of relevant HTML elements. 
 * Timer and Score: The timer and score were dynamically updated using the innerText property of DOM elements. ![image](https://github.com/user-attachments/assets/07a3e378-3212-472b-a24c-5c3d9afb2d35)

 * Answer Buttons: For each question, answer buttons were dynamically created, added to the DOM, and linked to event handlers for user interaction. ![image](https://github.com/user-attachments/assets/a0b68694-29d5-4e0f-82f0-effe39e04299)

* Capital Question Input: User inputs for the capital question were captured using the value property of input elements. ![image](https://github.com/user-attachments/assets/0c7e205f-02d5-437e-912c-3fb0254ae60b)

* Dynamic Element Creation: ew elements like buttons and input fields were created and appended to the DOM as needed. This allowed the game to dynamically change content based on the game state.
  ![image](https://github.com/user-attachments/assets/0a49fc3f-2c5d-4ccb-a030-9aaa6b2ccde9)

* Changing Visibility: Some elements, like the difficulty selection menu, were shown or hidden based on the game state by updating their style.display property.![image](https://github.com/user-attachments/assets/3e8e4a1f-f136-4b73-a5d9-a044695a93fa)


## HOW DID I GET HELP FROM ARTIFICIAL INTELLIGENCE?    

* Developing the Country Guessing Game with features like map integration, difficulty levels, a scoring system, and a timer.

* Structuring and designing game pages (e.g., capital_question.html, game_over.html).

* Styling with CSS to center content on the screen and improve visual appeal.

* Code Refinement and Aesthetics

* Implementing event handlers for button clicks and game mechanics.

* Using JavaScript for DOM manipulation and implementing dynamic game logic.

  https://chatgpt.com/share/67549a5d-b580-8006-8af9-18db283daf7a
