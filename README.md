# Kill The Cockroaches - PWA Game

A Progressive Web App game where you need to kill as many cockroaches as possible within the time limit.

## Features

- **Progressive Web App**: Can be installed on desktop and mobile devices
- **Offline Support**: Game works without internet connection
- **Timer**: 60-second countdown
- **Score Tracking**: Count of cockroaches killed
- **Increasing Difficulty**: Spawn rate increases every 10 seconds
- **Custom Cursor**: Mouse pointer changes to a slipper
- **Sound Effects**: Kill sounds and background music
- **Sound Controls**: Option to mute/unmute audio
- **Responsive Design**: Works on various screen sizes

## How to Play

1. Click "Start Game" to begin
2. Use your cursor (slipper) to click on cockroaches and kill them
3. Try to kill as many as possible before the timer runs out
4. Click "Play Again" to restart the game

## Installation

To install the game as a PWA:

1. Open the game URL in a compatible browser (Chrome, Edge, etc.)
2. Look for the install icon in the address bar or menu
3. Click "Install" to add the game to your device

## Project Structure

```
/
├── index.html          # Main HTML file
├── style.css           # CSS styles
├── app.js              # Game logic
├── service-worker.js   # Offline functionality
├── manifest.json       # PWA configuration
├── README.md           # Documentation
├── images/             # Game images
│   ├── cockroach.png
│   ├── dead-cockroach.png
│   ├── floor-background.jpg
│   ├── slipper-cursor.png
│   ├── sound-on.png
│   └── sound-off.png
├── sounds/             # Game audio
│   ├── background-music.mp3
│   └── squish.mp3
└── icons/              # App icons
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    └── icon-512x512.png
```

## Deployment

This game is deployed using GitHub Pages. You can access it at the following URL:

https://[YourGitHubUsername]/Lastname-finalact1-killthecockroaches

## Development

To run this project locally:

1. Clone the repository
2. Open the project folder in your code editor
3. Use a local server (e.g., Live Server extension in VS Code) to run the game
4. Make your changes and test locally
5. Push to GitHub to update the live version

## Credits

- Game developed as a final activity project
- Sound effects and images are royalty-free