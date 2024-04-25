// ai-gen start (ChatGPT-3.5, 0)
import { CommunityCard } from "@/components"; // Make sure to import the CommunityCard component correctly
import { describe, test, assert, afterEach} from "vitest";
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

describe("CommunityCard.tsx", () => {
    const initialState = { output: 10 }; // Using the same initial state as provided
    const mockStore = configureStore();
    let store;

    afterEach(() => {
        cleanup();
    });

    test("CommunityCard renders correctly", () => {
        store = mockStore(initialState);
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CommunityCard
                        name="Test Community"
                        street="123 Test Street"
                        users={["User1", "User2", "User3"]}
                        onClick={() => {}}
                    />
                </BrowserRouter>
            </Provider>
        );
        const communityCardElement = screen.getByTestId('CommunityCard');
        assert(communityCardElement);
    });
});
// ai-gen end