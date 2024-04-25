// ai-gen start (ChatGPT-3.5, 0)
import { Navbar } from "@/components"; // Make sure to import the Navbar component correctly
import { describe, test, assert, afterEach} from "vitest";
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

describe("Navbar.tsx", () => {
    const initialState = { output: 10 }; // Using the same initial state as provided
    const mockStore = configureStore();
    let store;

    afterEach(() => {
        cleanup();
    });

    test("Navbar renders correctly", () => {
        store = mockStore(initialState);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );
        const navbarElement = screen.getByTestId('Navbar');
        assert(navbarElement);
    });
});
// ai-gen end