import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ProfileScreen from '../src/screens/ProfileScreen';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('ProfileScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders title and subtitle', () => {
    const {getByText} = render(<ProfileScreen />);
    expect(getByText('Welcome to Your Profile')).toBeTruthy();
    expect(getByText('Access your account or create a new one')).toBeTruthy();
  });

  it('renders Sign In and Sign Up buttons', () => {
    const {getByText} = render(<ProfileScreen />);
    expect(getByText('Sign In')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
  });

  it('navigates to SignIn screen when Sign In is pressed', () => {
    const {getByText} = render(<ProfileScreen />);
    fireEvent.press(getByText('Sign In'));
    expect(mockNavigate).toHaveBeenCalledWith('SignIn');
  });

  it('navigates to SignUp screen when Sign Up is pressed', () => {
    const {getByText} = render(<ProfileScreen />);
    fireEvent.press(getByText('Sign Up'));
    expect(mockNavigate).toHaveBeenCalledWith('SignUp');
  });
});
