import React from "react";
import { render, screen } from "@testing-library/react";

import ServicegentempCreateDialogComponent from "../ServicegentempCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders servicegentemp create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ServicegentempCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("servicegentemp-create-dialog-component")).toBeInTheDocument();
});
