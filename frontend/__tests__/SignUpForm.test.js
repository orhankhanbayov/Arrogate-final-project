import React from 'react';
import renderer from 'react-test-renderer';
import {
  render,
  fireEvent,
  waitFor,
  act,
  screen,
} from '@testing-library/react-native';
import SignUpForm from '../src/components/user/SignUpForm';

describe('Sign up form', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SignUpForm />).toJSON();
    expect(tree.children.length).toBe(4);
  });

  it('renders all the input fields', () => {
    const { getByPlaceholderText } = render(<SignUpForm />);
    const nameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
  });

  it('updates input values correctly', () => {
    const { getByPlaceholderText } = render(<SignUpForm />);
    const nameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'johndoe@example.com');
    fireEvent.changeText(passwordInput, 'password');

    expect(nameInput.props.value).toBe('John Doe');
    expect(emailInput.props.value).toBe('johndoe@example.com');
    expect(passwordInput.props.value).toBe('password');
  });

  it('handles form submission', async () => {
    const navigation = { reset: jest.fn() };
    const { getByPlaceholderText, getByTestId } = render(
      <SignUpForm navigation={navigation} />
    );
    const nameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByTestId('signup-button');

    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'johndoe@example.com');
    fireEvent.changeText(passwordInput, 'password');

    fireEvent.press(submitButton);

    await waitFor(() => expect(navigation.reset).toHaveBeenCalledTimes(1));
  });
});
