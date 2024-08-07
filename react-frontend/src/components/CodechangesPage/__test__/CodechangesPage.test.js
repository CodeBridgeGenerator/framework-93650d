import React from "react";
import { render, screen } from "@testing-library/react";

import CodechangesPage from "../CodechangesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders codechanges page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CodechangesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("codechanges-datatable")).toBeInTheDocument();
    expect(screen.getByRole("codechanges-add-button")).toBeInTheDocument();
});
