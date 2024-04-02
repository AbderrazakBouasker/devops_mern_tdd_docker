const React = require('react');
const { render, fireEvent, waitFor } = require('@testing-library/react');
const Login = require('../Login').default;
const axios = require('axios'); 
const TokenContext = require('../../context/TokenContext');


jest.mock('axios');

describe('Login Component', () => {
	  test('renders without crashing', () => {
		      render(React.createElement(Login));
		    });

	  test('updates form data on input change', () => {
		      const { getByPlaceholderText } = render(React.createElement(Login));
		      const emailInput = getByPlaceholderText('Email address');
		      const passwordInput = getByPlaceholderText('Password');

		      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
		      fireEvent.change(passwordInput, { target: { value: 'password123' } });

		      expect(emailInput.value).toBe('test@example.com');
		      expect(passwordInput.value).toBe('password123');
		    });

	  test('calls handleSubmit with correct data on form submission', async () => {
		      const handleSubmit = jest.fn();
		      const { getByPlaceholderText, getByText } = render(
			            React.createElement(TokenContext.Provider, { value: { userToken: null, tokenDispatch: jest.fn(), userDispatch: jest.fn() } },
					            React.createElement(Login)
					          )
			          );

		      axios.post.mockResolvedValueOnce({ data: { token: 'test-token', user: { id: 1, email: 'test@example.com' } } });

		      fireEvent.change(getByPlaceholderText('Email address'), { target: { value: 'test@example.com' } });
		      fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
		      fireEvent.click(getByText('Login'));

		      await waitFor(() => {
			            expect(axios.post).toHaveBeenCalledWith('/user/login', { email: 'test@example.com', password: 'password123' });
			            expect(handleSubmit).toHaveBeenCalledTimes(1);
			          });
		    });

	  test('displays error message on login failure', async () => {
		      const { getByPlaceholderText, getByText } = render(React.createElement(Login));
		      axios.post.mockRejectedValueOnce({ response: { data: { message: 'Invalid credentials' } } });

		      fireEvent.change(getByPlaceholderText('Email address'), { target: { value: 'test@example.com' } });
		      fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
		      fireEvent.click(getByText('Login'));

		      await waitFor(() => {
			            expect(getByText('Invalid credentials')).toBeInTheDocument();
			          });
		    });

	  test('redirects to home page when userToken exists', () => {
		      const { queryByText } = render(
			            React.createElement(TokenContext.Provider, { value: { userToken: 'test-token', tokenDispatch: jest.fn(), userDispatch: jest.fn() } },
					            React.createElement(Login)
					          )
			          );

		      expect(queryByText('Email address')).not.toBeInTheDocument();
		    });
});

