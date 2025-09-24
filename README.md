# TailMate 🐱

A React Native Expo app built with TypeScript.

## Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # App screens/pages
├── store/              # Redux store and API
├── types/              # TypeScript type definitions
├── theme/              # Theme configuration
├── constants/          # App constants and layouts
└── utils/              # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd TailMate
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up The Cat API:

   - Get your API key from [The Cat API](https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=FJkYOq9tW)
   - Create a `.env` file in the root directory
   - Add your API key: `CAT_API_KEY=your_api_key_here`

4. Start the development server:

   ```bash
   npm start
   ```

5. Run on specific platforms:
   - iOS: `npm run ios`
   - Android: `npm run android`
   - Web: `npm run web`

## Testing

This project includes a comprehensive testing setup with Jest and React Native Testing Library.

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Structure

Tests are located in `__tests__` folders within each component directory. See [docs/testing.md](docs/testing.md) for detailed testing documentation.

## Development

### Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Technologies Used

- **React Native** - Mobile app framework
- **Expo** - Development platform and tools
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Navigation library
- **Redux Toolkit** - State management with RTK Query
- **Jest** - Testing framework
- **React Native Testing Library** - Component testing utilities
- **The Cat API** - Cat image and breed data

## API Integration

The app integrates with [The Cat API](https://thecatapi.com/) to fetch cat images and breed information.
