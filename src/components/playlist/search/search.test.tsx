import { render, screen } from '@testing-library/react';
import Search from './search';
import { Provider } from 'react-redux';
import store from 'store';
import { ChangeEvent } from 'react';

test('Search Bar test', () => {
    render(
        <Provider store={store}>
            <Search 
                search={"Fun"} 
                getTracks={function (): void {} } 
                searchChange={function (e: ChangeEvent<HTMLInputElement>): void {} } 
            />
        </Provider>
    );

    const searchInput = screen.getByRole("textbox");
    const searchButton = screen.getByRole("button", { name: /Search/i});

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(searchInput).toHaveValue("Fun");

});