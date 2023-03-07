import React from 'react';
import { render } from '@testing-library/react-native';
import MainContainer from 'frontend/src/components/navigation/mainContainer.js';

describe('MainContainer', () => {
  it('should render the Home screen by default', () => {
    const { getByText } = render(<MainContainer />);
    const homeScreen = getByText('Home');
    expect(homeScreen).toBeDefined();
  });

  it('should render the Settings screen when the Settings tab is pressed', () => {
    const { getByText } = render(<MainContainer />);
    const settingsTab = getByText('Settings');
    settingsTab.press();
    const settingsScreen = getByText('Settings Screen');
    expect(settingsScreen).toBeDefined();
  });

  it('should render the Map screen when the Map tab is pressed', () => {
    const { getByText } = render(<MainContainer />);
    const mapTab = getByText('Map');
    mapTab.press();
    const mapScreen = getByText('Map Screen');
    expect(mapScreen).toBeDefined();
  });

  it('should render the Trophy screen when the Trophy tab is pressed', () => {
    const { getByText } = render(<MainContainer />);
    const trophyTab = getByText('Trophy');
    trophyTab.press();
    const trophyScreen = getByText('Trophy Screen');
    expect(trophyScreen).toBeDefined();
  });
});
