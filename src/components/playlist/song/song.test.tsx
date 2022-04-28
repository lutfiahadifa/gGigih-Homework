import { render, screen } from '@testing-library/react';
import Song from './song';
import { Provider } from 'react-redux';
import store from 'store';

const SongData = {
    image: "https://1.bp.blogspot.com/-i9Q0C83hzg4/V6X2Sc172_I/AAAAAAAAAJY/vcOqaIrxRlsPjlC-EU4cH0q-dzUGt2c1QCLcB/s1600/tulus.jpeg", 
    title: "Sepatu",
    artist: "Tulus",
    album: "Gajah",
    duration: "3:43",
    select: true
}

test('Song should be rendered', () => {
  render(
    <Provider store={store}>
      <Song 
        image={SongData.image}
        title={SongData.title}
        artist={SongData.artist}
        album={SongData.album}
        duration={SongData.duration}
        select={SongData.select} 
        Selecthandler={function (uri: string): void {
            throw new Error('Function not implemented.');
        } } 
        uri={''}
      />
    </Provider>
  );

  const title = screen.getByText(SongData.title);
  const artists = screen.getByText(SongData.artist);
  const album = screen.getByText(SongData.album);
  const duration= screen.getByText(SongData.duration);
  const ButtonSubmit= screen.getByText(/Select/i);

  expect(title).toBeInTheDocument();
  expect(artists).toBeInTheDocument();
  expect(album).toBeInTheDocument();
  expect(duration).toBeInTheDocument();
  expect(ButtonSubmit).toBeInTheDocument();
});