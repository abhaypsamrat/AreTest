import React from 'react';
import {render} from '@testing-library/react-native';
import SettingsScreen from '../src/screens/SettingsScreen';

describe('SettingScreen', () => {
  test('renders the screen title', () => {
    const {getByText} = render(<SettingsScreen />);
    expect(getByText('Settings Screen')).toBeTruthy();
  });
});
