# The Hub Frontend

## Overview

This repository contains the frontend codebase for The Hub, a community-focused web application designed to help users manage tasks, events, and communications. The application is built with a mobile-first approach, with plans to adapt the design for tablet and laptop devices. The wireframes for the mobile design are created in Figma, and the implementation prioritizes modularity and scalability.

## Repository

- **URL**: https://github.com/WBS-Bootcamp-Repos/the-hub-frontend.git

## Tech Stack

- **Framework**: React
- **Language**: JavaScript
- **Styling**: Tailwind CSS, Daisy UI.
- **Build Tool**: Vite
- **Package Manager**: npm

## Project Structure

- `src/`: Contains the source code for the application.
  - `components/`: Reusable UI components.
  - `pages/`: Page-level components for routing.
  - `assets/`: Static assets like images and fonts.
  - `styles/`: Global styles and theme configurations.
- `public/`: Public assets and the main HTML file.

## Setup Instructions

1. Clone the repository:
   ```
   git clone git@github.com:WBS-Bootcamp-Repos/the-hub-frontend.git
   ```
2. Navigate to the project directory:
   ```
   cd the-hub-frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Open the application in your browser at `http://localhost:3000` (or the specified port).

## Development Guidelines

- Follow a mobile-first design approach based on the Figma wireframes.
- Start with independent frames like Sign Up, Lists (New List Form), and Calendar (New Event/Edit Event Forms) to minimize dependencies.
- Ensure components are reusable and follow a consistent naming convention.
- Write clean, modular code and adhere to linting and formatting standards.

## Contributing

- Create a new branch for each feature or bug fix:
  ```
  git checkout -b feature/your-feature-name
  ```
- Commit changes with clear, descriptive messages.
- Push your branch and create a pull request for review.

## Contact

For questions or feedback, reach out to our team or raise a github issue.
