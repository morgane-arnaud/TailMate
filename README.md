# TailMate

A React Native Expo app built with TypeScript.

## Project Structure

```
src/
├── api/          # API configuration and services
├── components/   # Reusable UI components
├── screens/      # App screens/pages
├── utils/        # Utility functions and helpers
└── tests/        # Test files and utilities
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Run on specific platforms:
   - iOS: `npm run ios`
   - Android: `npm run android`
   - Web: `npm run web`

## Development

This project uses TypeScript and follows a modular structure. Each folder in `src/` serves a specific purpose:

- **api/**: Contains API configuration, types, and service functions
- **components/**: Reusable UI components that can be used across screens
- **screens/**: Individual screens/pages of the app
- **utils/**: Helper functions and utilities
- **tests/**: Test files and testing utilities

## Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser

## Technologies Used

- React Native
- Expo
- TypeScript
- React Navigation (to be added)
