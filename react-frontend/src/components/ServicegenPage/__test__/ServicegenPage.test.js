import React from "react";
import { render, screen } from "@testing-library/react";

import ServicegenPage from "../ServicegenPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders servicegen page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ServicegenPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("servicegen-datatable")).toBeInTheDocument();
    expect(screen.getByRole("servicegen-add-button")).toBeInTheDocument();
});
