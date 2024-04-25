// ai-gen start (ChatGPT-3.5, 0)
import { Map } from '@/components'; // Make sure to import the Map component correctly
import { describe, test, assert, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { IMarker } from '@/types';

describe('Map.tsx', () => {
  const initialState = { output: 10 }; // Using the same initial state as provided
  const mockStore = configureStore();
  let store;

  afterEach(() => {
    cleanup();
  });

  test('Map renders correctly', () => {
    store = mockStore(initialState);
    const location = { lat: 40.7128, lng: -74.006 }; // Example location
    // ai-gen end
    const markers: IMarker[] = [
      { latitude: 40.7128, longitude: -74.006, type: 'cone' },
      { latitude: 40.7128, longitude: -74.006, type: 'carAccident' },
    ]; // Example posts

    // ai-gen start (ChatGPT-3.5, 0)
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Map location={location} markers={markers} />
        </BrowserRouter>
      </Provider>
    );
    const mapElement = screen.getByTestId('Map');
    assert(mapElement);
  });
});
// ai-gen end
