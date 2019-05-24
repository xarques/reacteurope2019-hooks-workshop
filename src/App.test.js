import React from 'react';
import {
  render,
  fireEvent,
  wait,
  cleanup,
  waitForElement
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import axios from 'axios';

import { I18nProvider } from './components/I18n';
import App from './App';
import fr from './locales/fr.json';
import en from './locales/en.json';

jest.mock('axios');

afterEach(cleanup);

describe('App', () => {
  it('should display text in different languages', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        page: 1,
        total_results: 138,
        total_pages: 7,
        results: [
          {
            vote_count: 11362,
            id: 11,
            video: false,
            vote_average: 8.2,
            title: 'Star Wars',
            popularity: 37.978,
            poster_path: '/btTdmkgIvOi0FFip1sPuZI2oQG6.jpg',
            original_language: 'en',
            original_title: 'Star Wars',
            genre_ids: [12, 28, 878],
            backdrop_path: '/4iJfYYoQzZcONB9hNzg0J0wWyPH.jpg',
            adult: false,
            overview:
              'Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.',
            release_date: '1977-05-25'
          }
        ]
      }
    });
    const { getByText } = render(
      <I18nProvider translations={{ fr, en }} defaultLocale="en">
        <App />
      </I18nProvider>
    );

    const title = getByText('Smooth Movies');
    expect(title).toHaveTextContent('Smooth Movies');

    const button = getByText('Smooth Movies');
    fireEvent.click(button);
    wait(() => {
      expect(title).toHaveTextContent('Smooth Films');
    });
    const movie = await waitForElement(() => getByText('Star Wars'));
    expect(movie).toHaveTextContent('Star Wars');
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
