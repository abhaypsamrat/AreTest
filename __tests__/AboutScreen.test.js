import React from 'react';
import {render} from '@testing-library/react-native';
import AboutScreen from '../src/screens/AboutScreen';

describe('AboutScreen', () => {
  test('renders the screen title', () => {
    const {getByText} = render(<AboutScreen />);
    expect(getByText('About Screen')).toBeTruthy();
  });
});
