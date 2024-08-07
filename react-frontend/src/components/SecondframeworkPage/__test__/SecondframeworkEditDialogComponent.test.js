import React from "react";
import { render, screen } from "@testing-library/react";

import SecondframeworkEditDialogComponent from "../SecondframeworkEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders secondframework edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SecondframeworkEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("secondframework-edit-dialog-component")).toBeInTheDocument();
});
