import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ProfileScreen from '../src/screens/ProfileScreen';
import {useNavigation} from '@react-navigation/native';

// Mock the useNavigation hook
const mockOpenDrawer = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    openDrawer: mockOpenDrawer,
  }),
}));

describe('ProfileScreen', () => {
  test('renders the screen title and button', () => {
    const {getByText} = render(<ProfileScreen />);

    // Check if the title and button exist
    expect(getByText('Profile Screen')).toBeTruthy();
    expect(getByText('Open Menu')).toBeTruthy();
  });

  test('calls openDrawer when button is pressed', () => {
    const {getByText} = render(<ProfileScreen />);

    fireEvent.press(getByText('Open Menu'));

    expect(mockOpenDrawer).toHaveBeenCalled();
  });
});
