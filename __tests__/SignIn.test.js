import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Alert} from 'react-native';

import SignIn from '../src/screens/SignIn';
import validationMessages from '../src/constants/validationMessages';

describe('SignIn Component', () => {
  beforeEach(() => {
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('show validation error when filed are empty', () => {
    const {getByTestId} = render(<SignIn />);
    fireEvent.press(getByTestId('signInButton'));
    expect(Alert.alert).toHaveBeenCalledWith(
      'Validation Error',
      validationMessages.allFieldsRequired,
    );
  });

  it('It show invalid email error', () => {
    const {getByPlaceholderText, getByTestId} = render(<SignIn />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'invalidemail');
    fireEvent.changeText(getByPlaceholderText('Password'), 'Abc@123');
    fireEvent.press(getByTestId('signInButton'));
    expect(Alert.alert).toHaveBeenCalledWith(
      'Validation Error',
      validationMessages.invalidEmail,
    );
  });

  it('Show weak password error', () => {
    const {getByPlaceholderText, getByTestId} = render(<SignIn />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@gmail.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'weak');
    fireEvent.press(getByTestId('signInButton'));

    expect(Alert.alert).toHaveBeenCalledWith(
      'Validation Error',
      validationMessages.weakPassword,
    );
  });

  it('show success message on valid input', () => {
    const {getByPlaceholderText, getByTestId} = render(<SignIn />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@gmail.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'Password@123');
    fireEvent.press(getByTestId('signInButton'));

    expect(Alert.alert).toHaveBeenCalledWith(
      'Success',
      validationMessages.signInSuccess,
    );
  });
});
