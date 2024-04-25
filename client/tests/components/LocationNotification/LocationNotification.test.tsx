// ai-gen start (ChatGPT-3.5, 0)
import { LocationNotification } from "@/components"; // Make sure to import the LocationNotification component correctly
import { describe, test, assert, afterEach} from "vitest";
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

describe("LocationNotification.tsx", () => {
    const initialState = { output: 10 }; // Using the same initial state as provided
    const mockStore = configureStore();
    let store;

    afterEach(() => {
        cleanup();
    });

    test("LocationNotification renders correctly", () => {
        store = mockStore(initialState);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <LocationNotification 
                        onConfirmButtonClick={() => {}}
                        onCancelButtonClick={() => {}}
                    />
                </BrowserRouter>
            </Provider>
        );
        const locationNotificationElement = screen.getByTestId('LocationNotification');
        assert(locationNotificationElement);
    });
});
// ai-gen end