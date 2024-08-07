import React from "react";
import { render, screen } from "@testing-library/react";

import ProtocolEditDialogComponent from "../ProtocolEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders protocol edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProtocolEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("protocol-edit-dialog-component")).toBeInTheDocument();
});
