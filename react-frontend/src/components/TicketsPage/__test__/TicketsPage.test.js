import React from "react";
import { render, screen } from "@testing-library/react";

import TicketsPage from "../TicketsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders tickets page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TicketsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("tickets-datatable")).toBeInTheDocument();
    expect(screen.getByRole("tickets-add-button")).toBeInTheDocument();
});
