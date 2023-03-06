import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LocationOneClues from 'frontend/src/components/locations/LocationOneClues.js';
import { Alert } from 'react-native';

describe('LocationOneClues', () => {
  const navigation = { navigate: jest.fn() };
  const route = {
    params: {
      render: false,
      pass: false,
      route: {
        locations: [
          {
            name: 'Location 1',
            clue1: 'Clue 1',
            clue2: 'Clue 2',
            clue3: 'Clue 3',
          },
        ],
      },
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component', () => {
    render(<LocationOneClues navigation={navigation} route={route} />);
  });

});


describe('LocationOneClues', () => {
  test('should render the first clue when the button is clicked', () => {
    const mockRoute = {
      params: {
        render: false,
        pass: true,
        route: {
          locations: [
            {
              name: 'Location One',
              clue1: 'First Clue',
              clue2: 'Second Clue',
              clue3: 'Third Clue',
            },
          ],
        },
      },
    };
    const { getByTestId, getByText } = render(
      <LocationOneClues route={mockRoute} />
    );
    const button = getByTestId('get-first-clue-button');
    fireEvent.press(button);
    const firstClueText = getByText('First Clue');
    expect(firstClueText).toBeDefined();
  });


  test('should render the second clue when the button is clicked', () => {
    const mockRoute = {
      params: {
        render: false,
        pass: true,
        route: {
          locations: [
            {
              name: 'Location One',
              clue1: 'First Clue',
              clue2: 'Second Clue',
              clue3: 'Third Clue',
            },
          ],
        },
      },
    };
    const { getByTestId, getByText } = render(
      <LocationOneClues route={mockRoute} />
    );
    const button = getByTestId('get-second-clue-button');
    fireEvent.press(button);
    const firstClueText = getByText('Second Clue');
    expect(firstClueText).toBeDefined();
  });


  test('should render the third clue when the button is clicked', () => {
    const mockRoute = {
      params: {
        render: false,
        pass: true,
        route: {
          locations: [
            {
              name: 'Location One',
              clue1: 'First Clue',
              clue2: 'Second Clue',
              clue3: 'Third Clue',
            },
          ],
        },
      },
    };
    const { getByTestId, getByText } = render(
      <LocationOneClues route={mockRoute} />
    );
    const button = getByTestId('get-third-clue-button');
    fireEvent.press(button);
    const firstClueText = getByText('Third Clue');
    expect(firstClueText).toBeDefined();
  });

  test("when give up button is pressed, alert should be visible", () => {
    const mockRoute = {
      params: {
        render: false,
        pass: true,
        route: {
          locations: [
            {
              name: 'Location One',
              clue1: 'First Clue',
              clue2: 'Second Clue',
              clue3: 'Third Clue',
            },
          ],
        },
      },
    };
    const { getByTestId } = render(
      <LocationOneClues route={mockRoute} />
    );
    const button = getByTestId("give-up-button");
    Alert.alert = jest.fn();
    fireEvent.press(button);
    expect(Alert.alert.mock.calls.length).toBe(1);
  
  });

  
   
});

