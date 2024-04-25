// ai-gen start (ChatGPT-3.5, 0)
import { CreateAccount } from "@/components"; // Make sure to import the CreateAccount component correctly
import { describe, test, assert, afterEach} from "vitest";
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

describe("CreateAccount.tsx", () => {
    const initialState = { output: 10 }; // Using the same initial state as provided
    const mockStore = configureStore();
    let store;

    afterEach(() => {
        cleanup();
    });

    test("CreateAccount renders correctly", () => {
        store = mockStore(initialState);
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CreateAccount
                        currentStep={0}
                        steps={["Step 1", "Step 2", "Step 3"]}
                        handleBack={() => {}}
                        handleSubmit={() => {}}
                    />
                </BrowserRouter>
            </Provider>
        );
        const createAccountElement = screen.getByTestId('CreateAccount');
        assert(createAccountElement);
    });
});
// ai-gen end