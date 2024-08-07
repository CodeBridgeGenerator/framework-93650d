import React from "react";
import { render, screen } from "@testing-library/react";

import ServicegentempEditDialogComponent from "../ServicegentempEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders servicegentemp edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ServicegentempEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("servicegentemp-edit-dialog-component")).toBeInTheDocument();
});
