# Unit Testing Documentation

## Overview

This project uses Jest and React Native Testing Library for unit testing. The testing setup ensures that our components work correctly and maintain their expected behavior as the codebase evolves.

## Testing Framework

- **Jest**: JavaScript testing framework
- **@testing-library/react-native**: React Native testing utilities
- **react-test-renderer**: For rendering React components in tests

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

Tests are located in `__tests__` folders within each component directory:

```
src/
  components/
    __tests__/
      CatProfileCard.test.tsx
```

## Example Test

Here's an example of a simple test for the `CatProfileCard` component:

```typescript
import React from 'react';
import { render } from '@testing-library/react-native';
import CatProfileCard from '../CatProfileCard';

describe('CatProfileCard', () => {
  const mockProps = {
    breed: 'Persian',
    location: 'New York, NY',
    number: '#123',
    imageUri: 'https://example.com/cat.jpg',
  };

  it('renders correctly with all props', () => {
    const { getByText } = render(<CatProfileCard {...mockProps} />);

    expect(getByText('Persian')).toBeTruthy();
    expect(getByText('New York, NY')).toBeTruthy();
    expect(getByText('#123')).toBeTruthy();
  });
});
```

## Configuration

The testing setup is configured in:

- `jest.config.js`: Main Jest configuration
- `jest.setup.js`: Test setup and mocks
- `package.json`: Test scripts

## Mocking

Common mocks are set up in `jest.setup.js`:

- React Native vector icons
- React Native gesture handler
- React Native safe area context
