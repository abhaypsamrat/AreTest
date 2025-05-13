import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import renderer, {act} from 'react-test-renderer';
import AboutScreen from '../src/screens/AboutScreen';

describe('This is for test suite', () => {
  test('this is for the test', async () => {
    const {getByText} = render(<AboutScreen />);

    await waitFor(() => {
      expect(getByText('About Screen')).toBeTruthy();
    });
  });

  test('this test case match snapshots', async () => {
    let tree;
    await act(async () => {
      tree = renderer.create(<AboutScreen />).toJSON();
    });

    expect(tree).toMatchSnapshot();
  });
});
