import React from 'react';
import {render} from '@testing-library/react-native';
import MoreInfo from '../src/components/MoreInfo';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import taskReducer from '../src/redux/slices/taskSlice';
import {
  MORE_INFO_TEST_IDS,
  MORE_INFO_TEXT,
} from '../src/constants/moreInfoConstants';

const renderWithRedux = (component, {initialState} = {}) => {
  const store = configureStore({
    reducer: {
      task: taskReducer,
    },
    preloadedState: initialState,
  });

  return render(<Provider store={store}>{component}</Provider>);
};

describe('MoreInfo Component', () => {
  it('renders static UI content', () => {
    const {getByTestId, getByText} = renderWithRedux(<MoreInfo />, {
      initialState: {
        task: {
          tasks: [],
        },
      },
    });

    expect(getByTestId(MORE_INFO_TEST_IDS.heading)).toBeTruthy();
    expect(getByText(MORE_INFO_TEXT.heading)).toBeTruthy();
  });
});
