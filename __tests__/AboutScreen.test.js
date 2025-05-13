import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import AboutScreen from '../src/screens/AboutScreen';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('AboutScreen', () => {
  test('renders the screen title', () => {
    const {getByTestId} = render(<AboutScreen />);
    expect(getByTestId('title')).toBeTruthy();
  });

  test('renders the More Info button', () => {
    const {getByText} = render(<AboutScreen />);
    expect(getByText('More Info')).toBeTruthy();
  });

  test('Navigate more info screen on button press', () => {
    const {getByTestId} = render(<AboutScreen />);

    fireEvent.press(getByTestId('moreInfoButton'));
    expect(mockNavigate).toHaveBeenCalledWith('MoreInfo');
  });
});
