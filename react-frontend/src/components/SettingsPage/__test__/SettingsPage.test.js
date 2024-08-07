import React from "react";
import { render, screen } from "@testing-library/react";

import SettingsPage from "../SettingsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders settings page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SettingsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("settings-datatable")).toBeInTheDocument();
    expect(screen.getByRole("settings-add-button")).toBeInTheDocument();
});
