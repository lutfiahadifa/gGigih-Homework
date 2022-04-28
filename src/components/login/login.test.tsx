import { render, screen } from '@testing-library/react';
import Login from './login';
import { Provider } from 'react-redux';
import store from 'store';

test('Login Button should be rendered', () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  const loginButton = screen.getByText(/LOGIN WITH SPOTIFY/i);
  expect(loginButton).toBeInTheDocument();
});