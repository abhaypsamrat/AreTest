import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import MoreInfo from '../src/components/MoreInfo';
import {
  MORE_INFO_TEST_IDS,
  MORE_INFO_TEXT,
} from '../src/constants/moreInfoConstants';

describe('MoreInfo Component', () => {
  it('renders static UI content', () => {
    const {getByTestId, getByText} = render(<MoreInfo />);

    expect(getByTestId(MORE_INFO_TEST_IDS.heading)).toBeTruthy();
    expect(getByText(MORE_INFO_TEXT.heading)).toBeTruthy();

    expect(getByTestId(MORE_INFO_TEST_IDS.description)).toBeTruthy();
    expect(getByText(MORE_INFO_TEXT.description)).toBeTruthy();

    expect(getByTestId(MORE_INFO_TEST_IDS.showButton)).toBeTruthy();
    expect(getByText(MORE_INFO_TEXT.showDetails)).toBeTruthy();
  });

  it('it show details when button is pressed', () => {
    const {getByTestId, getByText} = render(<MoreInfo />);

    fireEvent.press(getByTestId(MORE_INFO_TEST_IDS.showButton));
    expect(getByTestId(MORE_INFO_TEST_IDS.details)).toBeTruthy();
    expect(getByText(MORE_INFO_TEXT.details)).toBeTruthy();
  });

  it('hides details when button is pressed again', () => {
    const {getByTestId, queryByTestId, getByText} = render(<MoreInfo />);
    const toggleBtn = getByTestId(MORE_INFO_TEST_IDS.showButton);

    fireEvent.press(toggleBtn); // show
    fireEvent.press(toggleBtn); // hide

    expect(queryByTestId(MORE_INFO_TEST_IDS.details)).toBeNull();
    expect(getByText(MORE_INFO_TEXT.showDetails)).toBeTruthy();
  });

  it('toggles button text between show/hide', () => {
    const {getByTestId, getByText} = render(<MoreInfo />);
  });
});
