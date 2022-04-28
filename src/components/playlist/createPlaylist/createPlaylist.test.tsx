import { render, screen } from '@testing-library/react';
import CreatePlaylist from './createPlaylist';
import { Provider } from 'react-redux';
import store from 'store';
import userEvent from '@testing-library/user-event';

test('Playlist should be rendered', () => {
    render(
        <Provider store={store}>
            <CreatePlaylist 
                accessToken={''} 
                uriTrack={[]} 
                clearSelected={function (): void {} }
            />
        </Provider>
    );

    const playlistName = screen.getByPlaceholderText("Your Playlist Title");
    const playlistDescription = screen.getByPlaceholderText("Descripstion");
    const buttonSubmit = screen.getByRole("button", { name: /Submit/i })

    expect(playlistName).toBeInTheDocument();
    expect(playlistDescription).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
});

test('Playlist Form can be filled by user', () => {
    render(
        <Provider store={store}>
            <CreatePlaylist 
                accessToken={''} 
                uriTrack={[]} 
                clearSelected={function (): void {} }
            />
        </Provider>
    );

    const playlistName = screen.getByPlaceholderText("Your Playlist Title");
    const playlistDescription = screen.getByPlaceholderText("Descripstion");

    userEvent.type(playlistName, "Happy Playlist");
    userEvent.type(playlistDescription, "Playlist Test");

    expect(playlistName).toHaveValue("Happy Playlist");
    expect(playlistDescription).toHaveValue("Playlist Test");
});