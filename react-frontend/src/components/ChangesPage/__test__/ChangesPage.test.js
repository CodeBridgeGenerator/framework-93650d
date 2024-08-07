import React from "react";
import { render, screen } from "@testing-library/react";

import ChangesPage from "../ChangesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders changes page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ChangesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("changes-datatable")).toBeInTheDocument();
    expect(screen.getByRole("changes-add-button")).toBeInTheDocument();
});
