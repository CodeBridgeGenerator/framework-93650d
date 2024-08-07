import React from "react";
import { render, screen } from "@testing-library/react";

import ProtocolPage from "../ProtocolPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders protocol page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProtocolPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("protocol-datatable")).toBeInTheDocument();
    expect(screen.getByRole("protocol-add-button")).toBeInTheDocument();
});
