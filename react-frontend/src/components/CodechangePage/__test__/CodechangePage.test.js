import React from "react";
import { render, screen } from "@testing-library/react";

import CodechangePage from "../CodechangePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders codechange page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CodechangePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("codechange-datatable")).toBeInTheDocument();
    expect(screen.getByRole("codechange-add-button")).toBeInTheDocument();
});
