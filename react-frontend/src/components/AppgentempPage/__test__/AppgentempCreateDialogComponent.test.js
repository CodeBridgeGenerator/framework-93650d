import React from "react";
import { render, screen } from "@testing-library/react";

import AppgentempCreateDialogComponent from "../AppgentempCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders appgentemp create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AppgentempCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("appgentemp-create-dialog-component")).toBeInTheDocument();
});
