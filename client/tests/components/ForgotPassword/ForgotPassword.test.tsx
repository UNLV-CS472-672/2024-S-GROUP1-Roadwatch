// ai-gen start (ChatGPT-3.5, 0)
import { ForgotPassword } from "@/components"; // Make sure to import the ForgotPassword component correctly
import { describe, test, assert, afterEach} from "vitest";
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

describe("ForgotPassword.tsx", () => {
    const initialState = { output: 10 }; // Using the same initial state as provided
    const mockStore = configureStore();
    let store;

    afterEach(() => {
        cleanup();
    });

    test("ForgotPassword renders correctly", () => {
        store = mockStore(initialState);
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ForgotPassword />
                </BrowserRouter>
            </Provider>
        );
        const forgotPasswordElement = screen.getByTestId('ForgotPassword');
        assert(forgotPasswordElement);
    });
});
// ai-gen end