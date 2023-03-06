import React from 'react';
import { render, fireEvent, waitFor, findByText } from '@testing-library/react-native';
import LogInForm from '../src/components/auth/LoginForm';
import renderer from 'react-test-renderer';


const mockNavigation = {
    reset: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
  


jest.mock('console', () => ({
    log: jest.fn(),
}));

describe('login', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the form correctly', () => {
        const { getByPlaceholderText, getByTestId } = render(<LogInForm />);
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
        const loginButton = getByTestId('login-button');
    
        expect(emailInput).toBeDefined();
        expect(passwordInput).toBeDefined();
        expect(loginButton).toBeDefined();
    });
    
    it('should update the email state when the email input changes', () => {
        const { getByPlaceholderText } = render(<LogInForm />);
        const emailInput = getByPlaceholderText('Email');
    
        fireEvent.changeText(emailInput, 'test@test.com');
    
        expect(emailInput.props.value).toEqual('test@test.com');
    });

    it('should update the password state when the password input changes', () => {
        const { getByPlaceholderText } = render(<LogInForm />);
        const passwordInput = getByPlaceholderText('Password');
    
        fireEvent.changeText(passwordInput, 'password123');
    
        expect(passwordInput.props.value).toEqual('password123');
    });

    it('should navigate to the sign up screen when the "Sign up" link is pressed', () => {
        const navigationMock = { navigate: jest.fn() };
        const { getByText } = render(<LogInForm navigation={navigationMock} />);
        const signUpLink = getByText('SignUp!');
    
        fireEvent.press(signUpLink);
    
        expect(navigationMock.navigate).toHaveBeenCalledWith('SignUp');
    });
    it('should fill in email and password fields and submit form', async () => {
        const mockNavigation = {
          reset: jest.fn(),
          navigate: jest.fn(),
        };
        
        global.fetch = jest.fn(() => {
          return Promise.resolve({
            status: 201,
            json: () => Promise.resolve({ token: 'testToken' }),
          });
        });
      
        const consoleLogSpy = jest.spyOn(console, 'log');
      
        const { getByTestId } = render(<LogInForm navigation={mockNavigation} />);
              
        const emailInput = getByTestId('Email');
        const passwordInput = getByTestId('Password');
            
        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, 'password');
        fireEvent.press(getByTestId('login-button'));
      
        expect(fetch).toHaveBeenCalledWith(
          'https://mystery-route-backend.onrender.com/tokens',
          expect.objectContaining({
            method: 'post',
            headers: expect.objectContaining({
              'Content-Type': 'application/json',
            }),
            body: expect.any(String),
          })
        );
      
        await waitFor(() => {
          expect(mockNavigation.reset).toHaveBeenCalledWith({
            index: 0,
            routes: [{ name: 'MainContainer' }],
          });
          expect(consoleLogSpy).toHaveBeenCalledWith('success');
        });
      });

      it('displays error message when fetch request fails', async () => {
        const mockError = new Error('Something went wrong');
        global.fetch = jest.fn().mockImplementation(() => Promise.reject(mockError));
    
        const { getByTestId, findByText } = render(<LogInForm navigation={{}} />);
    
        const emailInput = getByTestId('Email');
        const passwordInput = getByTestId('Password');
        const submitButton = getByTestId('login-button');
    
        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.press(submitButton);

    
        global.fetch.mockClear();
      })
})

