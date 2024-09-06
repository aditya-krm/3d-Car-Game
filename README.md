# Vehicle Survival Game

Welcome to the Vehicle Survival Game! This game is built using React-three libraries, including Fiber, Drei, and Rapier, with a goal to create an engaging and fun experience where you control a vehicle to escape falling shapes.

Note: This project is an ongoing learning experience as I explore Three.js and React-three-fiber, Drei, Rapier for the first time.

- This project is still in progress and will be updated with new features and improvements.

## Table of Contents

- [Features](#features)
- [Game Mechanics](#game-mechanics)
- [Future Features](#future-features)
- [Tech Stack](#tech-stack)
<!-- - [Installation](#installation) -->
- [Usage](#usage)
- [Current Progress](#current-progress)
- [Future Improvements](#future-improvements)
- [License](#license)

## Features

- Vehicle Control: Move a vehicle with three wheels and a rectangular body.
- Dynamic Gameplay: Avoid falling shapes with different masses and sizes.
- Physics Simulation: Realistic interactions of shapes with the ground.

## Game Mechanics

1. Vehicle Design:

- The vehicle has three wheels: a front wheel as a sphere and two back wheels as cylinders.
- The vehicle body is rectangular.

2. Movement Controls:

- Press "W" to move forward in the direction you point the cursor.
- Press "S" to move backward.
- The mouse helps you take turns.

3. Falling Shapes:

- Randomly generated shapes (cubes, spheres, pyramids) fall from the sky.
- Shapes have varying masses and sizes.
  The goal is to avoid these shapes to survive.

4. Physics:

- Falling shapes exhibit realistic physics properties when they hit the ground.

## Future Features

1. Score Storage:

- Store the score in a Supabase database at the end of the game.

2. Responsive Design:

- Use Tailwind CSS to ensure the game is adaptable to mobile and tablet screens.

## Tech Stack

- Frontend & Backend: Next.js
- 3D Graphics: React-three Fiber, Drei
- Physics Engine: React-three Rapier
- Styling: Tailwind CSS (for responsive design)

## Usage

- Use the "W" and "S" keys to control the vehicle's movement.
- Move the mouse to steer the vehicle.
- Avoid falling shapes to keep the game going.

## Current Progress

- Implemented the basic vehicle with three wheels and a rectangular body.
- Added ground and physics for the vehicle.
- Set up basic falling shapes with random generation and physics properties.

## Future Improvements

- Falling Shapes: Enhance the randomness and variety of falling shapes.
- Scoring System: Implement a scoring system and integrate with Supabase.
- Mobile Responsiveness: Further optimize the game for mobile and tablet devices.
