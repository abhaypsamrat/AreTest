import React from 'react';
import {render} from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import AboutScreen from '../src/screens/AboutScreen';

describe('This is for test suite', () => {
  test('this is for the test', () => {
    const {getByText} = render(<AboutScreen />);
    expect(getByText('About Screen')).toBeTruthy();
  });

  test('this test case match snapshots', () => {
    const tree = renderer.create(<AboutScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
