import React from "react";
import { render, screen } from "@testing-library/react";

import ServicechangesPage from "../ServicechangesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders servicechanges page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ServicechangesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("servicechanges-datatable")).toBeInTheDocument();
    expect(screen.getByRole("servicechanges-add-button")).toBeInTheDocument();
});
