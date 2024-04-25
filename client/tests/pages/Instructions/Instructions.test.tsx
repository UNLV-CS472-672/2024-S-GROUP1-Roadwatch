// ai-gen start (ChatGPT-3.5, 0)
import { Instructions } from "@/pages";
import { describe, test, assert, afterEach} from "vitest";
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

describe("Instructions.tsx", () => {
    const initialState = { output: 10 };
    const mockStore = configureStore();
    let store;

    afterEach(() => {
        cleanup();
    });

    test("Logo renders", () => {
        store = mockStore(initialState);
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Instructions />
                </BrowserRouter>
            </Provider>
        );
        const element = screen.getByTestId('Instructions-logo');
        assert(element);
    });

    test("Carousel renders", () => {
        store = mockStore(initialState);
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Instructions />
                </BrowserRouter>
            </Provider>
        );
        const element = screen.getByTestId('Instructions-carousel');
        assert(element);
    });

    test("Button renders", () => {
        store = mockStore(initialState);
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Instructions />
                </BrowserRouter>
            </Provider>
        );
        const element = screen.getByTestId('Instructions-button');
        assert(element);
    });
});
// ai-gen end