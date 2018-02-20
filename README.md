---
layout: _pages/post
title: Simon Game
date: '2018-02-20'
link: 'https://andersclso.github.io/FCC-Simon-Game/'
code: 'https://github.com/andersclso/FCC-Simon-Game'
program: Freecodecamp - Front End Development Certification
course: Advanced Front End Development Projects
project: 04 - Build a Simon Game
categories:
  - code
tags:
  - javascript
---
# Freecodecamp Advanced Front End Development Project
Build an app that is functionally similar to this: https://codepen.io/Em-Ant/full/QbRyqq/.

## Project Criteria:
* User Story:  I am presented with a random series of button presses.
* User Story: Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.
* User Story: I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.
* User Story: If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.
* User Story: I can see how many steps are in the current series of button presses.
* User Story: If I want to restart, I can hit a button to do so, and the game will return to a single step.
* User Story: I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.
* User Story: I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.

## Functional Additions:
- The speed increases at level 11 and 16 to increase game difficulty.
- Added additional sounds to notify player of wrong moves, speed changes, and victory.
