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

  it('displays the correct breed name', () => {
    const { getByText } = render(<CatProfileCard {...mockProps} />);

    const breedText = getByText('Persian');
    expect(breedText).toBeTruthy();
  });

  it('displays the correct location', () => {
    const { getByText } = render(<CatProfileCard {...mockProps} />);

    const locationText = getByText('New York, NY');
    expect(locationText).toBeTruthy();
  });

  it('displays the correct number', () => {
    const { getByText } = render(<CatProfileCard {...mockProps} />);

    const numberText = getByText('#123');
    expect(numberText).toBeTruthy();
  });

  it('renders with different props', () => {
    const differentProps = {
      breed: 'Maine Coon',
      location: 'Los Angeles, CA',
      number: '#456',
      imageUri: 'https://example.com/maine-coon.jpg',
    };

    const { getByText } = render(<CatProfileCard {...differentProps} />);

    expect(getByText('Maine Coon')).toBeTruthy();
    expect(getByText('Los Angeles, CA')).toBeTruthy();
    expect(getByText('#456')).toBeTruthy();
  });
});
