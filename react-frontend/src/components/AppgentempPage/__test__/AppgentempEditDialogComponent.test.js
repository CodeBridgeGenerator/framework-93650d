import React from "react";
import { render, screen } from "@testing-library/react";

import AppgentempEditDialogComponent from "../AppgentempEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders appgentemp edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AppgentempEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("appgentemp-edit-dialog-component")).toBeInTheDocument();
});
