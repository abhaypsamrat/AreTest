import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import SignUp from '../src/screens/SignUp';
import {Alert} from 'react-native';
import validationMessages from '../src/constants/validationMessages';
import {fillValidForm} from '../src/utils/formHelpers';

jest.spyOn(Alert, 'alert');

jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));

describe('Sign up screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows error when required fields are empty', async () => {
    const {getByTestId} = render(<SignUp />);
    fireEvent.press(getByTestId('signUpButton'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Validation Error',
        validationMessages.allFieldsRequired,
      );
    });
  });

  test('shows error for invalid email format', async () => {
    const {getByPlaceholderText, getByTestId} = render(<SignUp />);

    fillValidForm(getByPlaceholderText, {email: 'invalidemail'});

    fireEvent.press(getByTestId('signUpButton'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Validation Error',
        validationMessages.invalidEmail,
      );
    });
  });

  test('shows error for weak password', async () => {
    const {getByPlaceholderText, getByTestId} = render(<SignUp />);

    fillValidForm(getByPlaceholderText, {
      password: '12345',
      confirmPassword: '12345',
    });

    fireEvent.press(getByTestId('signUpButton'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Validation Error',
        validationMessages.weakPassword,
      );
    });
  });

  test('accepts only PNG images for profile image', async () => {
    const {launchImageLibrary} = require('react-native-image-picker');

    launchImageLibrary.mockImplementation((options, callback) => {
      callback({
        didCancel: false,
        assets: [
          {
            uri: 'file://some/path/image.png',
          },
        ],
      });
    });

    const {getByPlaceholderText, getByText, getByTestId} = render(<SignUp />);

    fillValidForm(getByPlaceholderText);

    fireEvent.press(getByText('Select Profile Image (PNG only)'));
    fireEvent.press(getByTestId('signUpButton'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Success',
        'Form submitted successfully!',
      );
    });
  });
});
