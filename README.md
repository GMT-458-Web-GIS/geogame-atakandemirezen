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
  

## HOW DID I GET HELP FROM ARTIFICIAL INTELLIGENCE?    

* Developing the Country Guessing Game with features like map integration, difficulty levels, a scoring system, and a timer.

* Structuring and designing game pages (e.g., capital_question.html, game_over.html).

* Styling with CSS to center content on the screen and improve visual appeal.

* Code Refinement and Aesthetics

* Implementing event handlers for button clicks and game mechanics.

* Using JavaScript for DOM manipulation and implementing dynamic game logic.

  https://chatgpt.com/share/67549a5d-b580-8006-8af9-18db283daf7a
