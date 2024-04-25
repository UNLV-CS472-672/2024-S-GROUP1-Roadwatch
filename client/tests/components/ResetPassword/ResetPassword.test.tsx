// ai-gen start (ChatGPT-3.5, 0)
import { describe, test, assert, afterEach } from "vitest";
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store'; // Import redux-mock-store
import { ResetPassword } from "@/components"; // Make sure to import the ResetPassword component correctly

describe("ResetPassword.tsx", () => {
    const initialState = { output: 10 };
    const mockStore = configureStore(); // Create a mock store
    let store;

    afterEach(() => {
        cleanup();
    });

    test("ResetPassword renders correctly", () => {
        store = mockStore(initialState); // Initialize the mock store
        render(
            <Provider store={store}> {/* Provide the store to the component */}
                <BrowserRouter>
                    <ResetPassword />
                </BrowserRouter>
            </Provider>
        );
        const resetPasswordElement = screen.getByTestId('ResetPassword');
        assert(resetPasswordElement);
    });
});
// ai-gen end