import React from "react";
import { render, screen } from "@testing-library/react";

import FrameworkPage from "../FrameworkPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders framework page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <FrameworkPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("framework-datatable")).toBeInTheDocument();
    expect(screen.getByRole("framework-add-button")).toBeInTheDocument();
});
