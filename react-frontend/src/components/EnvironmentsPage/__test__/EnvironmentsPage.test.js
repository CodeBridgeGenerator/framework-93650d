import React from "react";
import { render, screen } from "@testing-library/react";

import EnvironmentsPage from "../EnvironmentsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders environments page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EnvironmentsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("environments-datatable")).toBeInTheDocument();
    expect(screen.getByRole("environments-add-button")).toBeInTheDocument();
});
