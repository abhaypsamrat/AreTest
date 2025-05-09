import {fireEvent} from '@testing-library/react-native';

export const fillValidForm = (getByPlaceholderText, overrides = {}) => {
  const defaultValues = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    address: '123 Street',
    age: '25',
    phone: '1234567890',
    password: 'Strong@123',
    confirmPassword: 'Strong@123',
  };

  const values = {...defaultValues, ...overrides};

  fireEvent.changeText(getByPlaceholderText('First Name'), values.firstName);
  fireEvent.changeText(getByPlaceholderText('Last Name'), values.lastName);
  fireEvent.changeText(getByPlaceholderText('Email'), values.email);
  fireEvent.changeText(getByPlaceholderText('Address'), values.address);
  fireEvent.changeText(getByPlaceholderText('Age'), values.age);
  fireEvent.changeText(getByPlaceholderText('Phone Number'), values.phone);
  fireEvent.changeText(getByPlaceholderText('Password'), values.password);
  fireEvent.changeText(
    getByPlaceholderText('Confirm Password'),
    values.confirmPassword,
  );
};
