import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
});
afterEach(() => {
  console.log.mockRestore();
});

test('shows loading initially', async () => {
  const {getByText} = render(<HomeScreen />);
  await waitFor(() => {
    expect(getByText('Loading...')).toBeTruthy();
  });
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
          address: {city: 'New York'},
          company: {name: 'ABC Corp'},
        },
      ]),
  }),
);

test('renders user data after loading', async () => {
  const {getByText} = render(<HomeScreen />);

  await waitFor(() => {
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('john@example.com')).toBeTruthy();
    expect(getByText('1234567890')).toBeTruthy();
    expect(getByText('New York')).toBeTruthy();
    expect(getByText('ABC Corp')).toBeTruthy();
  });
});

test('displays error message when fetch fails', async () => {
  global.fetch = jest.fn(() => Promise.reject(new Error('Network Error')));
  const {getByText} = render(<HomeScreen />);

  await waitFor(() => {
    expect(getByText('Failed to load data')).toBeTruthy();
  });
});
