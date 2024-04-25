// ai-gen start (ChatGPT-3.5, 0)
import { Loading } from "@/components"; // Make sure to import the Loading component correctly
import { describe, test, assert, afterEach} from "vitest";
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

describe("Loading.tsx", () => {
    const initialState = { output: 10 }; // Using the same initial state as provided
    const mockStore = configureStore();
    let store;

    afterEach(() => {
        cleanup();
    });

    test("Loading renders correctly", () => {
        store = mockStore(initialState);
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Loading />
                </BrowserRouter>
            </Provider>
        );
        const loadingElement = screen.getByTestId('Loading');
        assert(loadingElement);
    });
});
// ai-gen end