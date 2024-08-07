import React from "react";
import { render, screen } from "@testing-library/react";

import ServicegentempPage from "../ServicegentempPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders servicegentemp page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ServicegentempPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("servicegentemp-datatable")).toBeInTheDocument();
    expect(screen.getByRole("servicegentemp-add-button")).toBeInTheDocument();
});
