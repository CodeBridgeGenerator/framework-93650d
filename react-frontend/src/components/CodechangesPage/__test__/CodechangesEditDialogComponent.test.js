import React from "react";
import { render, screen } from "@testing-library/react";

import CodechangesEditDialogComponent from "../CodechangesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders codechanges edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CodechangesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("codechanges-edit-dialog-component")).toBeInTheDocument();
});
